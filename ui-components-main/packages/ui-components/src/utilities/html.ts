export function nodeIsElement(node: Node): node is Element {
  const element = (node as Element) && node.nodeType === Node.ELEMENT_NODE

  return element
}

export function elementIsHTMLElement(element: Element): element is HTMLElement {
  return element instanceof HTMLElement
}

export function nodeContainsTarget(node: Node, target: Node): boolean
export function nodeContainsTarget(node?: Node, event?: Event): false
export function nodeContainsTarget(node: Node, event: Event): boolean
export function nodeContainsTarget(node?: Node, targetOrEvent?: Node | Event): boolean {
  const target = targetOrEvent instanceof Event ? targetOrEvent.target : targetOrEvent

  return !!node && !!target && node.contains(target as Node)
}
