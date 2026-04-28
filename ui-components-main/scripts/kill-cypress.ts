import { exec } from 'child_process'
import { promisify } from 'util'

const execAsync = promisify(exec)

interface ProcessInfo {
  pid: number
  command: string
}

async function getProcesses(searchTerm: string): Promise<ProcessInfo[]> {
  try {
    // Using grep -i for case insensitive search and including more variations
    const searchPatterns = [`ps aux | grep -i "${searchTerm}"`, `ps aux | grep -i "cypress"`]

    const allProcesses = new Set<ProcessInfo>()

    for (const pattern of searchPatterns) {
      try {
        const { stdout } = await execAsync(pattern)
        const processes = stdout
          .split('\n')
          .filter((line) => {
            if (!line) return false
            const lowerLine = line.toLowerCase()
            return !lowerLine.includes('grep') && !lowerLine.includes('node_modules') && !lowerLine.includes('kill-cypress')
          })
          .map((line) => {
            const parts = line.split(/\s+/)
            return {
              pid: parseInt(parts[1]),
              command: parts.slice(10).join(' '),
            }
          })
          .filter((proc) => proc.pid && !isNaN(proc.pid))

        processes.forEach((proc) => allProcesses.add(proc))
      } catch {
        // Continue if one pattern fails
      }
    }

    return Array.from(allProcesses)
  } catch {
    return []
  }
}

async function killProcess(pid: number): Promise<void> {
  const signals = ['SIGTERM', 'SIGINT', 'SIGKILL']
  const killCommands = [
    `kill -${15}`, // SIGTERM
    `kill -${2}`, // SIGINT
    `kill -${9}`, // SIGKILL
    'pkill -9 -f',
  ]

  for (const signal of signals) {
    try {
      process.kill(pid, signal)
      console.log(`✓ Killed process ${pid} with ${signal}`)
      return
    } catch {
      console.log(`⚠ Failed to kill process ${pid} with ${signal}`)
    }
  }

  for (const cmd of killCommands) {
    try {
      await execAsync(`${cmd} ${pid}`)
      console.log(`✓ Killed process ${pid} with command: ${cmd}`)
      return
    } catch {
      console.log(`⚠ Failed to kill process ${pid} with command: ${cmd}`)
    }
  }
}

async function killAllCypressProcesses(): Promise<void> {
  // First try to kill known Cypress-related processes
  const killPatterns = ['cypress', 'chromedriver']

  // Force kill any remaining processes
  const forceKillCommands = ['pkill -9 -f cypress', 'pkill -9 -f chromedriver', 'killall -9 cypress', 'killall -9 Cypress']

  // Try launchctl on macOS
  if (process.platform === 'darwin') {
    try {
      const { stdout } = await execAsync('launchctl list')
      const launchctlProcesses = stdout
        .split('\n')
        .filter((line) => {
          const lowerLine = line.toLowerCase()
          return killPatterns.some((pattern) => lowerLine.includes(pattern))
        })
        .map((line) => line.split(/\s+/)[0])
        .filter((pid) => !isNaN(Number(pid)))

      for (const pid of launchctlProcesses) {
        try {
          await execAsync(`launchctl remove ${pid}`)
          console.log(`✓ Removed launchctl process ${pid}`)
        } catch {
          console.log(`⚠ Failed to remove launchctl process ${pid}`)
        }
      }
    } catch {
      // Continue if launchctl fails
    }
  }

  // Kill all processes found by pattern
  for (const pattern of killPatterns) {
    const processes = await getProcesses(pattern)
    for (const process of processes) {
      await killProcess(process.pid)
    }
  }

  // Force kill using various commands
  for (const cmd of forceKillCommands) {
    try {
      await execAsync(cmd)
      console.log(`✓ Executed: ${cmd}`)
    } catch {
      // Ignore errors as some commands might fail if no matching processes exist
    }
  }

  // Double check for any remaining processes
  let remainingProcesses: ProcessInfo[] = []
  for (const pattern of killPatterns) {
    const processes = await getProcesses(pattern)
    remainingProcesses = [...remainingProcesses, ...processes]
  }

  if (remainingProcesses.length > 0) {
    console.log('\n⚠ Some processes might still be running:')
    for (const proc of remainingProcesses) {
      console.log(`PID: ${proc.pid}, Command: ${proc.command}`)
    }
  } else {
    console.log('\n✓ All Cypress-related processes have been terminated')
  }
}

// Run if called directly
if (require.main === module) {
  killAllCypressProcesses().catch((error) => {
    console.error('Failed to kill Cypress processes:', error)
    process.exit(1)
  })
}

export { killAllCypressProcesses }
