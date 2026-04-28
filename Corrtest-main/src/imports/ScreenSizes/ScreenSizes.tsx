function LAligned() {
  return (
    <div className="content-stretch flex gap-[12px] items-center relative shrink-0" data-name="L-aligned">
      <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[normal] not-italic relative shrink-0 text-[48px] text-black text-center tracking-[-0.4px] whitespace-nowrap">Screen Sizes</p>
    </div>
  );
}

function RAligned() {
  return <div className="content-stretch flex gap-[12px] h-[48px] items-center justify-end shrink-0 w-[162px]" data-name="R-aligned" />;
}

function LAligned1() {
  return <div className="content-stretch flex gap-[12px] h-[58px] items-center shrink-0 w-[225px]" data-name="L-aligned" />;
}

function RAligned1() {
  return (
    <div className="content-stretch flex gap-[12px] items-center justify-end relative shrink-0" data-name="R-aligned">
      <div className="flex flex-col font-['Roboto:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[32px] text-black text-right whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="leading-[48px]">Desktop</p>
      </div>
    </div>
  );
}

function Frame1() {
  return (
    <div className="content-stretch flex flex-col items-end pb-[8px] relative shrink-0 w-[1280px]">
      <p className="font-['Roboto:Regular',sans-serif] font-normal leading-[24px] relative shrink-0 text-[16px] text-black text-right w-[221px]" style={{ fontVariationSettings: "'wdth' 100" }}>
        1280px x 720px
      </p>
      <div className="content-stretch flex gap-[12px] items-center justify-end mb-[-8px] pb-[8px] relative shrink-0 w-full" data-name="_Section-header">
        <div aria-hidden="true" className="absolute border-b-4 border-black border-solid inset-[0_0_-2px_0] pointer-events-none" />
        <LAligned1 />
        <RAligned1 />
      </div>
    </div>
  );
}

function Desktop() {
  return <div className="bg-white h-[720px] rounded-[32px] shadow-[0px_10px_15px_-3px_rgba(0,0,0,0.1),0px_4px_6px_-4px_rgba(0,0,0,0.1)] shrink-0 w-[1280px]" data-name="Desktop" />;
}

function Display() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[40px] items-end left-[80px] top-[64px]" data-name="Display">
      <Frame1 />
      <Desktop />
    </div>
  );
}

function LAligned2() {
  return <div className="content-stretch flex gap-[12px] h-[58px] items-center shrink-0 w-[225px]" data-name="L-aligned" />;
}

function RAligned2() {
  return (
    <div className="content-stretch flex gap-[12px] items-center justify-end relative shrink-0" data-name="R-aligned">
      <div className="flex flex-col font-['Roboto:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[32px] text-black text-right whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="leading-[48px]">iFrame</p>
      </div>
    </div>
  );
}

function Frame2() {
  return (
    <div className="content-stretch flex flex-col items-end pb-[8px] relative shrink-0 w-full">
      <p className="font-['Roboto:Regular',sans-serif] font-normal leading-[24px] relative shrink-0 text-[16px] text-black text-right w-[221px]" style={{ fontVariationSettings: "'wdth' 100" }}>
        1000px x 800px
      </p>
      <div className="content-stretch flex gap-[12px] items-center justify-end mb-[-8px] pb-[8px] relative shrink-0 w-full" data-name="_Section-header">
        <div aria-hidden="true" className="absolute border-b-4 border-black border-solid inset-[0_0_-2px_0] pointer-events-none" />
        <LAligned2 />
        <RAligned2 />
      </div>
    </div>
  );
}

function IFrame() {
  return <div className="bg-white h-[800px] rounded-[32px] shrink-0 w-[1000px]" data-name="iFrame" />;
}

function Display2() {
  return (
    <div className="content-stretch flex flex-col items-center justify-end relative shadow-[0px_10px_15px_0px_rgba(0,0,0,0.1),0px_4px_6px_0px_rgba(0,0,0,0.1)] shrink-0" data-name="Display">
      <IFrame />
    </div>
  );
}

function Display1() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[40px] items-end left-[1480px] top-[64px] w-[997px]" data-name="Display">
      <Frame2 />
      <Display2 />
    </div>
  );
}

function LAligned3() {
  return <div className="content-stretch flex gap-[12px] h-[58px] items-center shrink-0 w-[225px]" data-name="L-aligned" />;
}

function RAligned3() {
  return (
    <div className="content-stretch flex gap-[12px] items-center justify-end relative shrink-0" data-name="R-aligned">
      <div className="flex flex-col font-['Roboto:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[32px] text-black text-right whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="leading-[48px]">Tablet</p>
      </div>
    </div>
  );
}

function Frame3() {
  return (
    <div className="content-stretch flex flex-col items-end pb-[8px] relative shrink-0 w-[672px]">
      <p className="font-['Roboto:Regular',sans-serif] font-normal leading-[24px] relative shrink-0 text-[16px] text-black text-right w-[221px]" style={{ fontVariationSettings: "'wdth' 100" }}>
        672px x 800px
      </p>
      <div className="content-stretch flex gap-[12px] items-center justify-end mb-[-8px] pb-[8px] relative shrink-0 w-full" data-name="_Section-header">
        <div aria-hidden="true" className="absolute border-b-4 border-black border-solid inset-[0_0_-2px_0] pointer-events-none" />
        <LAligned3 />
        <RAligned3 />
      </div>
    </div>
  );
}

function Tablet() {
  return <div className="bg-white h-[800px] rounded-[32px] shadow-[0px_10px_15px_-3px_rgba(0,0,0,0.1),0px_4px_6px_-4px_rgba(0,0,0,0.1)] shrink-0 w-[672px]" data-name="Tablet" />;
}

function Display3() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[40px] items-end left-[2597px] top-[64px] w-[672px]" data-name="Display">
      <Frame3 />
      <Tablet />
    </div>
  );
}

function LAligned4() {
  return <div className="content-stretch flex gap-[12px] h-[58px] items-center shrink-0 w-[225px]" data-name="L-aligned" />;
}

function RAligned4() {
  return (
    <div className="content-stretch flex gap-[12px] items-center justify-end relative shrink-0" data-name="R-aligned">
      <div className="flex flex-col font-['Roboto:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[32px] text-black text-right whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="leading-[48px]">Mobile</p>
      </div>
    </div>
  );
}

function Frame4() {
  return (
    <div className="content-stretch flex flex-col items-end pb-[8px] relative shrink-0 w-full">
      <p className="font-['Roboto:Regular',sans-serif] font-normal leading-[24px] relative shrink-0 text-[16px] text-black text-right w-[221px]" style={{ fontVariationSettings: "'wdth' 100" }}>
        360px x 800px
      </p>
      <div className="content-stretch flex gap-[12px] items-center justify-end mb-[-8px] pb-[8px] relative shrink-0 w-full" data-name="_Section-header">
        <div aria-hidden="true" className="absolute border-b-4 border-black border-solid inset-[0_0_-2px_0] pointer-events-none" />
        <LAligned4 />
        <RAligned4 />
      </div>
    </div>
  );
}

function Mobile() {
  return <div className="bg-white h-[800px] rounded-[32px] shadow-[0px_10px_15px_-3px_rgba(0,0,0,0.1),0px_4px_6px_-4px_rgba(0,0,0,0.1)] shrink-0 w-[360px]" data-name="Mobile" />;
}

function Display4() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[40px] items-end left-[3389px] top-[64px] w-[360px]" data-name="Display">
      <Frame4 />
      <Mobile />
    </div>
  );
}

function Frame() {
  return (
    <div className="absolute bg-[#f5f5f5] h-[1050px] left-[96px] overflow-clip rounded-[20px] top-[202px] w-[3829px]">
      <Display />
      <Display1 />
      <Display3 />
      <Display4 />
    </div>
  );
}

export default function ScreenSizes() {
  return (
    <div className="bg-white relative rounded-[32px] size-full" data-name="Screen Sizes">
      <div className="absolute content-stretch flex items-end justify-between left-[96px] pb-[8px] top-[96px] w-[3829px]" data-name="_Section-header">
        <div aria-hidden="true" className="absolute border-b-4 border-black border-solid inset-[0_0_-2px_0] pointer-events-none" />
        <LAligned />
        <RAligned />
      </div>
      <Frame />
    </div>
  );
}