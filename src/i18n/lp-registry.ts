/* ----------------------------------------------------------------------------
   The single list of Hebrew-only campaign landing pages.
   ---------------------------------------------------------------------------
   The sitemap, the proxy's known-paths list, the floating WhatsApp button's
   page names and llms.txt all derive from this one array, so adding a future
   landing page here registers it everywhere at once. The page's route and
   the verify suite's Hebrew-only set still need their own entries (a route
   file cannot be generated, and the suite is plain Node, outside the TS
   graph).
---------------------------------------------------------------------------- */

import { lpWrongfulDismissal } from "./lp-wrongful-dismissal";
import { lpHearing } from "./lp-hearing";
import { lpSeverancePay } from "./lp-severance-pay";
import { lpUnpaidWages } from "./lp-unpaid-wages";
import { lpProtectedPeriod } from "./lp-protected-period";
import { lpPropertyTransaction } from "./lp-property-transaction";
import { lpCommercialLawyer } from "./lp-commercial-lawyer";
import { lpCoOwnershipDissolution } from "./lp-co-ownership-dissolution";
import { lpContractorClaims } from "./lp-contractor-claims";
import { lpUrbanRenewal } from "./lp-urban-renewal";

/** The fields every landing-page module shares, whatever its template:
 *  LpPage (CampaignLanding) and LpProtectedPeriod both satisfy this. */
export type LandingPageContent = {
  updated: string;
  meta: { title: string; description: string };
  breadcrumb: { current: string };
};

export const landingPages: { path: string; content: LandingPageContent }[] = [
  { path: "/lp/wrongful-dismissal", content: lpWrongfulDismissal },
  { path: "/lp/hearing", content: lpHearing },
  { path: "/lp/severance-pay", content: lpSeverancePay },
  { path: "/lp/unpaid-wages", content: lpUnpaidWages },
  { path: "/lp/protected-period", content: lpProtectedPeriod },
  { path: "/lp/property-transaction", content: lpPropertyTransaction },
  { path: "/lp/commercial-lawyer", content: lpCommercialLawyer },
  { path: "/lp/co-ownership-dissolution", content: lpCoOwnershipDissolution },
  { path: "/lp/contractor-claims", content: lpContractorClaims },
  { path: "/lp/urban-renewal", content: lpUrbanRenewal },
];
