import type { ComponentType } from "react";
import type { SVGProps } from "react";
import {
  CommercialIcon,
  FamilyLawIcon,
  LaborLawIcon,
  LitigationIcon,
  RealEstateIcon,
  WillsEstatesIcon,
} from "@/components/Icons";

export const practiceAreaIcons: Record<
  string,
  ComponentType<SVGProps<SVGSVGElement>>
> = {
  "family-law": FamilyLawIcon,
  "real-estate": RealEstateIcon,
  "labor-law": LaborLawIcon,
  litigation: LitigationIcon,
  commercial: CommercialIcon,
  "wills-estates": WillsEstatesIcon,
};
