import svgPaths from "./svg-mte58f883v";
import imgScreenshot20260226At105213Pm1 from "./4af73ec61d72c042cb63bcec2d106135b9913a50.png";
import imgScreenshot20260226At104932Pm1 from "./7acf9105dc8879260526e6c4b7dd317c9b259fe6.png";
import imgScreenshot20260226At105106Pm1 from "./df990a00ea478edefd3472820557e72fb1520564.png";

function LAligned() {
  return (
    <div className="content-stretch flex gap-[12px] items-center relative shrink-0" data-name="L-aligned">
      <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[normal] not-italic relative shrink-0 text-[48px] text-black text-center tracking-[-0.4px] whitespace-nowrap">Data Viz Colors</p>
    </div>
  );
}

function RAligned() {
  return <div className="content-stretch flex gap-[12px] h-[48px] items-center justify-end shrink-0 w-[162px]" data-name="R-aligned" />;
}

function Display() {
  return (
    <div className="absolute bg-[#f5f5f5] content-stretch flex flex-col gap-[12px] items-center left-[96px] overflow-clip p-[24px] rounded-[20px] top-[861px] w-[1248px]" data-name="Display">
      <div className="font-['Inter:Bold',sans-serif] font-bold leading-[0] min-w-full not-italic relative shrink-0 text-[24px] text-black w-[min-content]">
        <p className="leading-[32px] mb-0">→ Mapped</p>
        <p className="font-['Inter:Italic',sans-serif] font-normal italic leading-[32px]">*Map how the colors are used here</p>
      </div>
      <div className="h-[646px] relative rounded-[4px] shrink-0 w-[539px]" data-name="Screenshot 2026-02-26 at 10.52.13 PM 1">
        <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none rounded-[4px] size-full" src={imgScreenshot20260226At105213Pm1} />
      </div>
      <div className="font-['Inter:Italic',sans-serif] font-normal italic leading-[0] min-w-full relative shrink-0 text-[24px] text-black w-[min-content]">
        <p className="font-['Inter:Regular',sans-serif] leading-[32px] mb-0 not-italic whitespace-pre-wrap">Palette Options:</p>
        <ul>
          <li className="leading-[32px] list-disc mb-0 ms-[36px] not-italic">
            <span className="font-['Inter:Regular',sans-serif] font-normal">{`🎨 `}</span>
            <span className="font-['Inter:Bold',sans-serif] font-bold">{`Categorical: `}</span>
            <span className="font-['Inter:Regular',sans-serif] font-normal">used to display single data points, or multiple</span>
          </li>
          <ul className="mb-0">
            <li className="list-disc ms-[72px]">
              <span className="font-['Inter:Regular',sans-serif] font-normal leading-[32px] not-italic">There are 3 options provided that you can choose from for charts with multiple data points</span>
            </li>
          </ul>
          <li className="leading-[32px] list-disc mb-0 ms-[36px] not-italic">
            <span className="font-['Inter:Regular',sans-serif] font-normal">🎨</span>
            <span className="font-['Inter:Bold',sans-serif] font-bold">{` Sequential:`}</span>
            <span className="font-['Inter:Regular',sans-serif] font-normal">{` used to compare a particular data point across a scale (e.g., time)`}</span>
          </li>
          <li className="leading-[32px] list-disc mb-0 ms-[36px] not-italic">
            <span className="font-['Inter:Bold',sans-serif] font-bold">🎨 Actu</span>
            <span className="font-['Inter:Regular',sans-serif] font-normal">{`al & `}</span>
            <span className="font-['Inter:Bold',sans-serif] font-bold">🎨 Projectio</span>
            <span className="font-['Inter:Regular',sans-serif] font-normal">n: used to compare actual vs. projections, or similar concepts</span>
          </li>
          <ul>
            <li className="leading-[32px] list-disc ms-[72px] whitespace-pre-wrap">
              <span className="font-['Inter:Regular',sans-serif] font-normal not-italic">If you are making a comparison in your chart and there is a third element, use categorical or sequential palettes instea</span>
              {`d.  `}
            </li>
          </ul>
        </ul>
      </div>
    </div>
  );
}

function Display1() {
  return (
    <div className="absolute bg-[#f5f5f5] content-stretch flex flex-col gap-[12px] h-[611px] items-center left-[96px] overflow-clip p-[24px] rounded-[20px] top-[202px] w-[600px]" data-name="Display">
      <div className="font-['Inter:Bold',sans-serif] font-bold leading-[0] min-w-full not-italic relative shrink-0 text-[24px] text-black w-[min-content]">
        <p className="leading-[32px] mb-0">→ _Colors/Polly</p>
        <p className="font-['Inter:Italic',sans-serif] font-normal italic leading-[32px]">*Base scale</p>
      </div>
      <div className="h-[295px] relative rounded-[4px] shrink-0 w-[529px]" data-name="Screenshot 2026-02-26 at 10.49.32 PM 1">
        <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none rounded-[4px] size-full" src={imgScreenshot20260226At104932Pm1} />
      </div>
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[32px] min-w-full not-italic relative shrink-0 text-[24px] text-black w-[min-content]">Each of the palettes in the other collections build upon this</p>
    </div>
  );
}

function Display2() {
  return (
    <div className="absolute bg-[#f5f5f5] content-stretch flex flex-col gap-[12px] items-center left-[744px] overflow-clip p-[24px] rounded-[20px] top-[202px] w-[600px]" data-name="Display">
      <div className="font-['Inter:Bold',sans-serif] font-bold leading-[0] min-w-full not-italic relative shrink-0 text-[24px] text-black w-[min-content]">
        <p className="leading-[32px] mb-0">→ _Tokens</p>
        <p className="font-['Inter:Italic',sans-serif] font-normal italic leading-[32px]">*Add semantic value here</p>
      </div>
      <div className="h-[283px] relative rounded-[4px] shrink-0 w-[532px]" data-name="Screenshot 2026-02-26 at 10.51.06 PM 1">
        <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none rounded-[4px] size-full" src={imgScreenshot20260226At105106Pm1} />
      </div>
      <div className="font-['Inter:Regular',sans-serif] font-normal leading-[0] min-w-full not-italic relative shrink-0 text-[24px] text-black w-[min-content]">
        <p className="leading-[32px] mb-0">Semantic Values</p>
        <ul className="leading-[32px] list-disc">
          <li className="mb-0 ms-[36px]">
            {`🎨 `}
            <span className="font-['Inter:Bold',sans-serif] font-bold not-italic">Primary:</span>
            {` `}
            <span className="font-['Inter:Regular',sans-serif] font-normal not-italic">used by default in charts</span>
          </li>
          <li className="mb-0 ms-[36px]">
            🎨<span className="font-['Inter:Bold',sans-serif] font-bold not-italic">{` Secondary`}</span>
            <span className="font-['Inter:Regular',sans-serif] font-normal not-italic">: supplementar</span>
            {`y; `}
            <span className="font-['Inter:Regular',sans-serif] font-normal not-italic">they can be used for things like,</span>
            <span className="font-['Inter:Italic',sans-serif] font-normal italic">{` projections`}</span>
          </li>
          <li className="ms-[36px]">
            <span className="font-['Inter:Bold',sans-serif] font-bold not-italic">🎨 Basi</span>c<span className="font-['Inter:Regular',sans-serif] font-normal not-italic">: used for things like lines, averages, points (dots on a line char</span>t)
          </li>
        </ul>
      </div>
    </div>
  );
}

export default function DataVizColors() {
  return (
    <div className="bg-white relative rounded-[32px] size-full" data-name="Data Viz Colors">
      <div className="absolute content-stretch flex items-end justify-between left-[96px] pb-[8px] top-[96px] w-[1248px]" data-name="_Section-header">
        <div aria-hidden="true" className="absolute border-b-4 border-black border-solid inset-[0_0_-2px_0] pointer-events-none" />
        <LAligned />
        <RAligned />
      </div>
      <Display />
      <Display1 />
      <Display2 />
      <div className="absolute flex h-[49px] items-center justify-center left-[1053px] top-[812px] w-0" style={{ "--transform-inner-width": "1200", "--transform-inner-height": "21" } as React.CSSProperties}>
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
      <div className="absolute h-0 left-[696px] top-[508px] w-[49px]">
        <div className="absolute inset-[-11.05px_-3.06%_-11.05px_-16.33%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 58.5 22.0919">
            <path d={svgPaths.p2480b300} fill="var(--stroke-0, #3D3D3D)" id="Line 7" />
          </svg>
        </div>
      </div>
    </div>
  );
}