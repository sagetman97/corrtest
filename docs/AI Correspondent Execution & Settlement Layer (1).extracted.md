# AI Correspondent Execution & Settlement Layer

## Infrastructure:

Rate sheets are a relic of the past. We need to eliminate them. They are static, yet the market is 
moving in real time, so there is execution slippage - both for buyers and sellers. We want to 
have all buyers leveraging a common API with a common data format.

● Buyer API
  ○ Base Price (Agency, Non-Agency)
  ○ LLPAs (Grids and CF-Based)
  ○ SRP (Grids and CF-Based)
  ○ CRA (Live bank axes), Spec (portal for street, investors), etc 

● UI’s to update eligibility (AI NLP component), LLPA’s, etc; if buyers want to make a quick 
  change and then reverse it 

● Mark-to-market pricing; eliminate rate sheets

● Other Notes:
  ○ Large aggregators use cash-flow models (prepayment, defaults, discount, 
    structured CF) for MSR valuation, loan-level SRP adjustments, LLPs 
    (adjustments for originators, credit holdback)
  ○ Buyer API has to support hybrid AOT workflow and price adjustment calcs
  ○ Buyers want market-share based dynamic margin adjustments
  ○ Buyers want to impose seller-level eligibility, or eligibility overwrites
  ○ Buyers need sufficient flexibility and control around base price, llpas, srps and 
    margin calculations to replace their internal models/spreadsheets, etc.
  ○ Consider integration to buyer’s API as transition strategy
  ○ Hedge Advisors have existing integration and workflow for whole loan bid tape 
    bidding, they will oppose any intermediation of their existing direct-to-investor 
    integration. Investors are loath to turn away any volume. 
  ○ Consider Buyer APIs providing pipeline marks for sellers, thereby exposing loans 
    buyers may bid on earlier in the pipeline process (hybrid best efforts), buyers get 
    more concrete market share data for each seller. Sellers benefit by avoiding 
    hedge cost, getting more timing loan-level marks, possibly getting higher prices 
    including CRA bids.

---

## Execution Layer:

AI Native feature set and agentic framework, Polly will streamline and automate the execution 
between buyers and sellers, enabling real-time mark to market pricing, recommended 
execution, and automated clearing

● Automated best efforts locking
  ○ NOTE: Competing PPEs have to agree to integrate to API and implement 
    automated best effort lock workflow.
  ○ NOTE: Real-time marks are probably excessive; daily or on-demand are 
    sufficient.

● Automated mandatory bid desk
  ○ NOTE: See notes above - Polly as aggregators of existing Buyer APIs and 
    supplier of API to remaining buyers. Hedge advisors have to agree to integrate.

● Agents for buyers to:
  ○ Precisely identify the production they want at a specific margin across their 
    approved customers (See notes above about access to seller pipelines)
  ○ Identify customers (anonymous, but we can make intros) they don’t do business 
    with and evaluate the production and revenue, based on defined margins

● Agent for sellers to:
  ○ Identify buyers they are not approved with that would have ‘won’ their business 
    and convey the revenue upside
  ○ Identify pricing delta between best efforts and mandatory
  ○ NOTE: Until buyers exercise more consistency in how they re-underwrite the 
    loan, process loan settlement, sellers are likely to want to limit the number of 
    investors. To that end, if there is a middle layer of “process guarantee”, that 
    could provide more certainty over their performance, that might lead sellers to 
    agree to work with more buyers. 

● Automated Market Making
  ○ Buyers enter their desired margins based on defined parameters, when willing to 
    commit in loan lifecycle, etc
  ○ Sellers enter their desired margin based on defined parameters, when willing to 
    commit in loan lifecycle, etc 
  ○ As market moves, execution is automatic (eg: how equities are handled via high 
    frequency trading)
  ○ NOTE: Hedging sellers, once loans are originated are trying to maximize the 
    loan sale price less hedge cost. In practice, buyer API would need to provide a 
    price to the seller that would be an identifiable premium over what the lender 
    would expect to get in a closed-loan auction. Therefore, sellers must have a 
    credible daily mandatory mark, and would only want to execute a forward sale if 
    a buyer has a credible bid x bps above what the lender thinks they otherwise 
    would get. 

---

## Settlement Layer:

AI Native feature set and agentic framework, Polly will automate the settlement of loan delivery, 
stip clearing, and cash settlement.

● Agent will automate the delivery the data/documents 
  ○ NOTE: This is the value proposition of ICE’s Investor Connect, which large 
    aggregators have adopted at a pretty good clip. ICE has the advantage of seller 
    and buyer being on Encompass and ICE being able to represent that the data is 
    securely “moved” from seller to buyer, providing more comfort to buyer with 
    respect to QC, fraud, reduced operational costs, etc. 
  ○ NOTE: This will require blockchain like data repository, to enable access to 
    applicable documents, train of transfer (MERS), etc.

● Agent will provide the seller the conditions required to settle the loan
  ○ NOTE: Ultimately, if buyer can access seller’s loan documents, they can do this 
    audit w/in x hours of loan sale, instead of delivery followed by a separate audit.
  ○ NOTE: Key will be how to access LOS documents, when LOS doesn’t want to 
    lose competitive advantage. 

● Agent will clear the conditions on behalf of buyer (agent to agent communication 
  between buy side and sell side)

● Agent will generate the Purchase Advice on behalf of buyer and ‘send’ to seller

● Cash settlement administered by Polly
  ○ Each buyer has a ‘master escrow’ account
    ■ Each customer of buyer will have a ‘sub’ escrow account
  ○ Agent releases cash settlement once buyer ‘approves’ what the settlement 
    agents have completed
  ○ NOTE: To discuss - what is strategic advantage of being in the middle of the 
    money; possible warehouse considerations

---

## Questions:

● Who are ‘anchor’ five buyers that are design partners
  ○ NOTE: If we start with top 5 bid-tape buyers, e.g. Penny, Amerihome, Freedom, 
    New Rez, Rocket 
  ○ What does this platform provide that they don’t already have?
  ○ Answer: Skeptical that any would agree to use a 3rd party partner, but Polly 
    could offer single 3rd party systems to provide more tractability, consistent 
    pricing, and get away from key personnel risk.
  ○ MSR CF API to produce loan-level MSR value, adjustments might the piece of 
    new technology, when properly integrated into RS, initial bidding, data 
    reconciliation/repricing as part of settlement, might excite top 5 
  ○ Other top candidates may be second tier buyers with underdeveloped systems or 
    new correspondent entries.
  ○ Would be interesting to review LendingSpace case study - was widely used and 
    then died quickly.

● Who are ‘anchor’ five sellers that are design partners

● Quantify amount of time and money saved by buyers
  ○ NOTE: Dig into margin accuracy and dynamism; better loan-level SRP 
    adjustors, more dynamic margin logic, broader pool optimization and capacity 
    considerations

● Quantify improved execution for buyers and sellers
  ○ NOTE: Dig into possibility of buying loans further back in the pipeline, perhaps 
    using CRA and specs as first use case.

● Evaluate competitive advantages for correspondents signed up relative to largest 
  correspondent buyers and agencies

● What gaps exist, so can identify SAM on sell side 
  ○ UMBS
  ○ GNMA

● Evaluate the monetization
  ○ How much per loan being charged to buyer
  ○ How many per loan being charged to seller

---

## Zooming Out (Gary/Rob 4/20/26)

### The Correspondent Ecosystem:

· Create pricing models  
· Price loans on loan level best efforts, mandatory and close-loan bid tape mandatory  
· Issues commitments for loans sold, accept AOTs  
· Hedge loans (loan, MSR) upon commitment  
· Operational Compliance: Credit & Appraisal, Closing Documents, Custodial  
· Purchase Advise, Reconciliation, Financial Settlement  
· Servicing Onboarding  
· Post Closing, Trailing Docs  
· Post Purchase Performance: EPOs, EPD, Delinquency, Prepays, Rep Mix, Delivery Metrics  

---

### What we think are the products:

· Base rate sheet securitization math  
· MSR Cash Flow Valuation and/or Co-Issue Grids  
· PPE (LLPA, Base Pricing, Eligibility, Margins, Lock and Lock Change)  

· Best Efforts Pricing & Committing APIs:
  o Loan level submission for pricing, registration and locking  
  o Pipeline Pricing  
  o Possible “Reserve Spread” – if bidding correspondent will pay greater than 
    reserve spread (x bps more than proxy pipeline mark – what they think they can 
    sell it for mandatory). Investors buy loans earlier (like in docs), save some hedge 
    cost for sellers  

· Mandatory Pricing API to ingest bulk bids and bid them:
  o API (lenders, hedge advisors call API to get investor bid)  
  o Bid Tape mapping, conversion  
  o AVM  
  o AMI, Geocoding, CRA Evaluation/bids  
  o Pricing (PPE + MSR Cash Flow)  
  o Possible different real-time eligibility  
  o Pool Optimizer consideration of full pipeline, in context of making bid  
  o Real-time seller analytics (market share, history)  
  o Dynamic adjustment of margins, margin optimization  
  o Shadow bidding support (approval nuance, rules around shadow bidding)  
  o API response is loan-level pricing  

· Mandatory Committing API:
  o Receives “Hit” from seller on loan-level  
  o Acceptance of AOT’s, Price Adjustment mechanism  
  o Creates commitment  

· Hedging Upon Purchase (Loan, MSR, IO)  

· Operation Compliance:
  o Deliverables:
    § ULDD Transmission  
    § Documents/Images (how to access Data folder)  
    § Integration to Vesta, ICE, other LOS  

  o Workflows/Review:
    § AI Ingestion, Convert  
    § Validate ULDD against Documents  
    § 3rd Party Integration (Palantir, Gateless)  
    § Fraud detection tools, integrations, temporal  
    § Workflow Rules for Conditional QC  
    § Additional eligibility based on broader data set  
    § Summarization, Exception Management  

· Purchase Advise/Reconciliation:
  o Compare snapshots of bid data to validated data received in delivery  
  o Late delivery, rolls, data changes  
  o API to support full detail of purchase and explanation of other adjustments  
  o Interest and payment purchased calculations  
  o Provide wire/warehouse instructions  

· Servicing Onboarding:
  o Servicing data upload to servicing system for given purchased payment date  
  o Integration to key servicing systems  
  o Goodbye letters (as appliable)  

· Custodial:
  o E-Notes  
  o MERS  

· Post Closing:
  o Recapture monitoring (PPE pricing)  
  o Servicing Signals (prepay request)  