import svgPaths from "./svg-fgqrr2b8u8";
import imgScreenshot20260226At101904Pm1 from "./76ee022c676b5855a766cf807f5ba5e15d06c42b.png";
import imgScreenshot20260226At101939Pm1 from "./fd5aeb5b9dc2c1115a1004b2810d56e06371bb6c.png";
import imgScreenshot20260226At102625Pm1 from "./91b043389c3e2c096b47c774cae514cb27b685b5.png";

function LAligned() {
  return (
    <div className="content-stretch flex gap-[12px] items-center relative shrink-0" data-name="L-aligned">
      <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[normal] not-italic relative shrink-0 text-[48px] text-black text-center tracking-[-0.4px] whitespace-nowrap">{`Variable Collections <> Eng Tokens`}</p>
    </div>
  );
}

function RAligned() {
  return <div className="content-stretch flex gap-[12px] h-[48px] items-center justify-end shrink-0 w-[162px]" data-name="R-aligned" />;
}

function Screenshot() {
  return (
    <div className="bg-[#f5f5f5] content-stretch flex flex-col gap-[12px] items-center overflow-clip px-[8px] py-[24px] relative rounded-[20px] shrink-0 w-[382px]" data-name="Screenshot">
      <p className="font-['Inter:Bold',sans-serif] font-bold leading-[32px] min-w-full not-italic relative shrink-0 text-[24px] text-black w-[min-content]">→ 3rd Level</p>
      <div className="h-[242px] relative rounded-[4px] shrink-0 w-[334px]" data-name="Screenshot 2026-02-26 at 10.19.04 PM 1">
        <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none rounded-[4px] size-full" src={imgScreenshot20260226At101904Pm1} />
      </div>
    </div>
  );
}

function Display() {
  return (
    <div className="absolute content-stretch flex gap-[32px] items-center left-[742px] top-[980px]" data-name="Display">
      <Screenshot />
      <div className="font-['Inter:Italic',sans-serif] font-normal italic leading-[0] relative shrink-0 text-[24px] text-black w-[747px]">
        <p className="font-['Inter:Bold',sans-serif] font-bold leading-[32px] mb-0 not-italic">Mapped</p>
        <ul className="list-disc mb-0">
          <li className="mb-0 ms-[36px]">
            <span className="leading-[32px]">Provides all needed context to which element it’s used within</span>
          </li>
          <li className="mb-0 ms-[36px]">
            <span className="leading-[32px]">The only published collection and what we us for components and designs</span>
          </li>
          <li className="ms-[36px]">
            <span className="leading-[32px]">White label modes and dark mode will live here</span>
          </li>
        </ul>
        <p className="leading-[32px]">Example: border/success-dark</p>
      </div>
    </div>
  );
}

function Screenshot1() {
  return (
    <div className="bg-[#f5f5f5] content-stretch flex flex-col gap-[12px] items-center overflow-clip px-[8px] py-[24px] relative rounded-[20px] shrink-0 w-[382px]" data-name="Screenshot">
      <p className="font-['Inter:Bold',sans-serif] font-bold leading-[32px] min-w-full not-italic relative shrink-0 text-[24px] text-black w-[min-content]">→ 1st Level</p>
      <div className="h-[236px] relative rounded-[4px] shrink-0 w-[256px]" data-name="Screenshot 2026-02-26 at 10.19.39 PM 1">
        <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none rounded-[4px] size-full" src={imgScreenshot20260226At101939Pm1} />
      </div>
    </div>
  );
}

function Display1() {
  return (
    <div className="absolute content-stretch flex gap-[32px] items-center left-[742px] top-[226px] w-[1158px]" data-name="Display">
      <Screenshot1 />
      <div className="font-['Inter:Regular',sans-serif] font-normal leading-[0] not-italic relative shrink-0 text-[24px] text-black w-[744px]">
        <p className="font-['Inter:Bold',sans-serif] font-bold leading-[32px] mb-0">_Colors/Polly</p>
        <ul className="list-disc mb-0">
          <li className="mb-0 ms-[36px]">
            <span className="leading-[32px]">Base or ”raw colors”</span>
          </li>
          <li className="mb-0 ms-[36px]">
            <span className="leading-[32px]">All possible options to pull from</span>
          </li>
          <li className="ms-[36px]">
            <span className="leading-[32px]">When custom themes are introduced, we can add a new collection per theme e.g., _Colors/Customer-Name</span>
          </li>
        </ul>
        <p className="leading-[32px]">Example: green-300, green-500</p>
      </div>
    </div>
  );
}

function Screenshot2() {
  return (
    <div className="bg-[#f5f5f5] content-stretch flex flex-col gap-[12px] items-center overflow-clip px-[8px] py-[24px] relative rounded-[20px] shrink-0 w-[382px]" data-name="Screenshot">
      <p className="font-['Inter:Bold',sans-serif] font-bold leading-[32px] min-w-full not-italic relative shrink-0 text-[24px] text-black w-[min-content]">→ 2nd Level</p>
      <div className="h-[238px] relative rounded-[4px] shrink-0 w-[247px]" data-name="Screenshot 2026-02-26 at 10.26.25 PM 1">
        <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none rounded-[4px] size-full" src={imgScreenshot20260226At102625Pm1} />
      </div>
    </div>
  );
}

function Display2() {
  return (
    <div className="absolute content-stretch flex gap-[32px] items-center left-[742px] top-[602px] w-[1161px]" data-name="Display">
      <Screenshot2 />
      <div className="font-['Inter:Regular',sans-serif] font-normal leading-[0] not-italic relative shrink-0 text-[24px] text-black w-[540px]">
        <p className="font-['Inter:Bold',sans-serif] font-bold leading-[32px] mb-0">_Tokens</p>
        <ul className="list-disc mb-0">
          <li className="mb-0 ms-[36px]">
            <span className="leading-[32px]">Semantic value applied</span>
          </li>
          <li className="ms-[36px]">
            <span className="leading-[32px]">Pulls from _Colors/Polly</span>
          </li>
        </ul>
        <p className="font-['Inter:Italic',sans-serif] italic leading-[32px]">Example: status/success/light</p>
      </div>
    </div>
  );
}

export default function VariableCollectionsEngTokens() {
  return (
    <div className="bg-white relative rounded-[32px] size-full" data-name="Variable Collections <> Eng Tokens">
      <div className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[0] left-[96px] not-italic text-[24px] text-black top-[226px] w-[540px]">
        <p className="leading-[32px] mb-0 whitespace-pre-wrap">We built colors into our variable library to ensure consistency and scalability and agility on both the design and engineering teams.</p>
        <p className="leading-[32px] mb-0 whitespace-pre-wrap">​</p>
        <p className="leading-[32px] mb-0 whitespace-pre-wrap">We have 3 Levels in the component system, and each layers on top of the next. When adding to the Library, start in Level 1, then building in it in Level 2, and assign product context in Level 3.</p>
        <p className="leading-[32px] mb-0 whitespace-pre-wrap">​</p>
        <p className="leading-[32px] mb-0 whitespace-pre-wrap">When publishing color changes, be sure to</p>
        <ul className="leading-[32px] list-disc mb-0">
          <li className="mb-0 ms-[36px]">
            U<span className="font-['Inter:Regular',sans-serif] font-normal not-italic">{`se `}</span>
            <a className="[text-decoration-skip-ink:none] cursor-pointer decoration-solid font-['Inter:Regular',sans-serif] font-normal not-italic underline" href="https://www.figma.com/community/plugin/1254848311152928301" target="_blank">
              <span className="[text-decoration-skip-ink:none] decoration-solid underline" href="https://www.figma.com/community/plugin/1254848311152928301" target="_blank">
                this plugin
              </span>
            </a>
            <span className="font-['Inter:Regular',sans-serif] font-normal not-italic">{` to download the json file`}</span>
          </li>
          <li className="ms-[36px]">
            C<span className="font-['Inter:Regular',sans-serif] font-normal not-italic">{`reate an issue that includes the file `}</span>
            <a className="[text-decoration-skip-ink:none] cursor-pointer decoration-solid font-['Inter:Regular',sans-serif] font-normal not-italic underline" href="https://github.com/PollyEx/ui-components" target="_blank">
              <span className="[text-decoration-skip-ink:none] decoration-solid underline" href="https://github.com/PollyEx/ui-components" target="_blank">
                here
              </span>
            </a>
            <span className="font-['Inter:Regular',sans-serif] font-normal not-italic">.</span>
          </li>
        </ul>
        <p className="leading-[32px] mb-0 whitespace-pre-wrap">This ensures that we maintain 1:1 tokens with engineering.</p>
        <p className="leading-[32px] whitespace-pre-wrap">​</p>
      </div>
      <div className="absolute content-stretch flex items-end justify-between left-[96px] pb-[8px] top-[96px] w-[1807px]" data-name="_Section-header">
        <div aria-hidden="true" className="absolute border-b-4 border-black border-solid inset-[0_0_-2px_0] pointer-events-none" />
        <LAligned />
        <RAligned />
      </div>
      <p className="absolute font-['Roboto:Regular',sans-serif] font-normal italic leading-[0] left-[1480px] text-[0px] text-black top-[202px] w-[423px]" style={{ fontVariationSettings: "'wdth' 100" }}>
        <span className="font-['Roboto:Bold_Italic',sans-serif] font-bold leading-[24px] text-[16px]" style={{ fontVariationSettings: "'wdth' 100" }}>
          Note
        </span>
        <span className="font-['Roboto:Italic',sans-serif] leading-[24px] text-[16px]" style={{ fontVariationSettings: "'wdth' 100" }}>
          : “_” Signifies that the collection doesn’t get published
        </span>
      </p>
      <Display />
      <Display1 />
      <Display2 />
      <div className="absolute flex h-[49px] items-center justify-center left-[922px] top-[547px] w-0" style={{ "--transform-inner-width": "1200", "--transform-inner-height": "21" } as React.CSSProperties}>
        <div className="flex-none rotate-90">
          <div className="h-0 relative w-[49px]">
            <div className="absolute inset-[-11.05px_-3.06%_-11.05px_-16.33%]">
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 58.5 22.0919">
                <path d={svgPaths.p2480b300} fill="var(--stroke-0, #3D3D3D)" id="Line 2" />
              </svg>
            </div>
          </div>
        </div>
      </div>
      <div className="absolute flex h-[49px] items-center justify-center left-[933px] top-[925px] w-0" style={{ "--transform-inner-width": "1200", "--transform-inner-height": "21" } as React.CSSProperties}>
        <div className="flex-none rotate-90">
          <div className="h-0 relative w-[49px]">
            <div className="absolute inset-[-11.05px_-3.06%_-11.05px_-16.33%]">
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 58.5 22.0919">
                <path d={svgPaths.p2480b300} fill="var(--stroke-0, #3D3D3D)" id="Line 2" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}