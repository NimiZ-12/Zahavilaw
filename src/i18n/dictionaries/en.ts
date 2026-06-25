import type { Dictionary } from "../dictionaries";

const en: Dictionary = {
  brand: {
    name: "Zahavi - Pretty & Co. Law Offices",
    short: "Zahavi - Pretty & Co.",
    tagline: "Professional, personal and precise legal representation",
  },
  meta: {
    defaultTitle: "Zahavi - Pretty & Co. Law Offices | Professional Legal Representation",
    defaultDescription:
      "Zahavi - Pretty & Co. Law Offices provides comprehensive legal counsel in family, real estate, labor, commercial and litigation law. Initial consultation, high availability and a personal approach for every client.",
    keywords: [
      "lawyer",
      "law firm",
      "legal advice",
      "family law",
      "real estate",
      "labor law",
      "litigation",
      "commercial lawyer",
    ],
  },
  nav: {
    home: "Home",
    about: "About",
    practiceAreas: "Practice Areas",
    team: "Our Team",
    publications: "Publications & Media",
    contact: "Contact",
    cta: "Book a Meeting",
    skipToContent: "Skip to main content",
    menu: "Menu",
  },
  home: {
    hero: {
      eyebrow: "Law Offices",
      title: "By your side, every step of the way",
      subtitle:
        "Zahavi - Pretty & Co. combines extensive legal experience with professional depth, strategic thinking and the personal involvement of the partners in every case, guiding you with confidence in every field and at every stage — from the first meeting to the desired result.",
      ctaPrimary: "Book a consultation",
      ctaSecondary: "Our practice areas",
    },
    stats: [
      { value: "30+", label: "Years of experience" },
      { value: "1,500+", label: "Satisfied clients" },
      { value: "24/6", label: "Availability" },
    ],
    clients: {
      title: "Among Our Clients",
      items: [
        { name: "Sela", logo: "/clients/sela.png" },
        { name: "Jacobs Farm", logo: "/clients/jacobs-farm.png" },
        { name: "Burgeranch", logo: "/clients/burgeranch.png" },
        { name: "Tiv Taam", logo: "/clients/tiv-taam.png" },
        { name: "Beinleumi TECH", logo: "/clients/beinleumi-tech.png" },
        { name: "Prytek", logo: "/clients/prytek.png" },
        { name: "Agudat Lechem", logo: "/clients/agudat-lechem.png" },
      ],
    },
    intro: {
      eyebrow: "Why choose Zahavi - Pretty & Co.",
      title: "Accumulated experience, personal partner attention",
      body: "Zahavi - Pretty & Co. provides its clients with broad, multidisciplinary legal counsel, guiding companies, businesses, families and private individuals through every legal juncture — from litigation and business advisory, through real estate and labor law, to family law, wills and estates. The firm is led by two founding partners, members of the Israel Bar Association since 1996, who are personally involved in every case — both strategically and tactically — from start to finish.",
      features: [
        {
          title: "Experience since 1996",
          body: "Three decades of courtroom representation and negotiation in complex civil, commercial and business matters.",
        },
        {
          title: "Personal partner involvement",
          body: "Every case is handled personally and closely by one of the founding partners, from initial strategy to final outcome.",
        },
        {
          title: "Multidisciplinary perspective",
          body: "An answer to every legal need across the firm's practice areas, drawing on deep familiarity with each one and a complete view of your matter.",
        },
        {
          title: "Uncompromising availability",
          body: "Fast responses, clear communication and full commitment to your interests throughout the entire process.",
        },
      ],
    },
    practiceTeaser: {
      eyebrow: "Practice Areas",
      title: "Broad expertise under one roof",
      body: "A range of professional legal services, for individuals and businesses, with one personal and comprehensive approach.",
      cta: "View all practice areas",
    },
    ctaBand: {
      title: "Have a legal question? You don't have to face it alone.",
      body: "Leave your details and we'll get back to you to schedule an initial consultation, in full confidence.",
      cta: "Book a meeting",
    },
  },
  practiceAreas: {
    eyebrow: "Practice Areas",
    title: "Our practice areas",
    subtitle:
      "The firm provides full legal support across a range of fields. Select an area to learn more about the service we offer.",
    learnMore: "Learn more",
    backToAll: "Back to all areas",
    inThisArea: "What we do in this area",
    faqTitle: "Frequently Asked Questions",
    needHelp: "Need advice in this area?",
    items: [
      {
        slug: "litigation",
        title: "Civil & Commercial Litigation",
        summary: "Managing civil and commercial claims and disputes in court.",
        description:
          "Successful litigation begins with strategy. The firm handles complex civil and commercial proceedings at every instance, with meticulous preparation, judicious management of the evidence and a constant pursuit of the best outcome — by settlement or judgment.",
        points: [
          "Contractual, monetary and tort claims",
          "Commercial disputes between partners and shareholders",
          "Applications for interim relief, attachments and injunctions",
          "Representation in mediation and arbitration",
        ],
      },
      {
        slug: "labor-law",
        title: "Labor Law",
        summary: "Representing employees and employers, guiding individuals and companies through legal proceedings at all levels, employment agreements and protecting your rights when violated.",
        description:
          "Dismissal, a pre-termination hearing, unpaid wages? These are stressful events that demand a fast and precise response. Our firm represents employees and employers at all levels — guiding companies and individuals through proceedings, employment agreements and labor disputes, with a partner personally involved in every case. Unsure of your rights? Feel your rights have been violated? Need legal advice? Don't wait — leave your details now and we will get back to you promptly.",
        points: [
          "Guidance through hearings, dismissals and labor disputes",
          "Claims for rights, compensation and social benefits",
          "Drafting employment, confidentiality and non-compete agreements",
          "Dismissals during reserve duty, pregnancy or workplace discrimination",
        ],
        faq: [
          {
            q: "What is a pre-termination hearing and why does it matter?",
            a: "A pre-termination hearing is a mandatory procedure before any dismissal, in which the employer must allow the employee to state their case. A hearing conducted unlawfully may render the dismissal invalid. Early preparation with a lawyer can change the outcome.",
          },
          {
            q: "Am I entitled to severance pay?",
            a: "As a general rule, an employee who has worked more than one year with the same employer is entitled to severance pay. There are exceptions and grounds for dismissal that affect entitlement. A review of your employment circumstances will allow us to give you a precise answer.",
          },
          {
            q: "I was dismissed during pregnancy — what are my rights?",
            a: "Dismissal during pregnancy without approval from the Ministry of Labor is generally completely prohibited. An employee dismissed in this situation may seek cancellation of the dismissal and compensation. It is important to seek legal advice immediately upon receiving notice of dismissal.",
          },
          {
            q: "I was dismissed after returning from reserve duty — is that lawful?",
            a: "The law prohibits dismissal of an employee within 30 days of completing reserve service, without special approval. Dismissal during this period is presumed to be unlawful. Contact us to have the circumstances examined.",
          },
          {
            q: "How long do I have to file a claim?",
            a: "Claims for wrongful dismissal, wage withholding and social benefits are subject to limitation periods ranging from one to seven years, depending on the type of claim. The sooner you act, the better the prospects for preserving evidence and options.",
          },
        ],
      },
      {
        slug: "real-estate",
        title: "Real Estate",
        summary: "Real estate transactions, sale contracts, urban renewal and taxation.",
        description:
          "A real estate transaction is often the largest deal of a person's life. The firm guides buyers, sellers and developers through every stage — from due diligence to land registry — fully protecting your interests and minimizing risk.",
        points: [
          "Guidance in the sale and purchase of apartments and commercial properties",
          "Title due diligence and registration with the Land Registry and Israel Land Authority",
          "Urban renewal projects — TAMA 38 and evacuation-reconstruction",
          "Tax planning and real estate taxation aspects of the deal",
        ],
      },
      {
        slug: "commercial",
        title: "Commercial & Corporate",
        summary: "Company formation, commercial contracts, ongoing counsel and deals.",
        description:
          "Behind every successful business stands a solid legal foundation. The firm guides companies and entrepreneurs from formation through growth — drafting contracts, founder and investment agreements, and providing ongoing legal counsel that lets you focus on your business.",
        points: [
          "Formation of companies, partnerships and founders' agreements",
          "Drafting commercial contracts and engagement agreements",
          "Guidance through transactions, investments and mergers",
          "Ongoing legal counsel (retainer) for businesses",
        ],
      },
      {
        slug: "wills-estates",
        title: "Wills & Estates",
        summary: "Drafting wills, probate orders, estate administration and disputes.",
        description:
          "Proper planning of the transfer of assets between generations brings peace of mind and prevents disputes. The firm drafts wills, handles inheritance and probate proceedings, and represents clients in inheritance disputes with sensitivity to family and to the testator's wishes.",
        points: [
          "Drafting wills and agreements between heirs",
          "Obtaining inheritance and probate orders",
          "Estate administration and representation of estate administrators",
          "Representation in objections and inheritance disputes",
        ],
      },
      {
        slug: "family-law",
        title: "Family Law",
        summary: "Prenuptial agreements, mediation and comprehensive legal guidance through proceedings.",
        description:
          "Family law requires a rare combination of legal professionalism and human sensitivity. The firm guides clients through proceedings, handles division of property, mediation and prenuptial agreements — aiming for the fairest and calmest solution for you and your children.",
        points: [
          "Guiding clients through legal proceedings",
          "Mediation",
          "Prenuptial agreements and cohabitation agreements",
          "Strategic management of property division and balancing of resources between spouses",
        ],
      },
    ],
  },
  about: {
    eyebrow: "About the Firm",
    title: "Senior, personal and multidisciplinary legal counsel",
    lead: "Zahavi - Pretty & Co. Law Offices is a boutique firm providing clients — companies, business owners, families and individuals — with senior, personal legal representation across a broad range of legal fields.",
    body: [
      "The firm is led by Ron Zahavi, Adv. and Anat Zahavi, Adv., two founding partners and members of the Israel Bar Association since 1996, with a combined experience of over three decades. We believe quality legal representation requires the personal involvement of a partner in every case — both strategically and tactically — rather than being passed between staff along the way.",
      "Daily engagement across a wide range of legal fields is one of the firm's key strengths: complex civil-commercial litigation, guiding companies and businesses in commercial and corporate matters, real estate in all its aspects, labor law from the employer's perspective, as well as family law and wills and estates. This broad perspective allows us to understand every dispute or transaction in its full context, and to build the right strategy for each client.",
      "Among the firm's clients, past and present, are some of the largest and best-known companies in the Israeli economy — in food and fast-food retail, telecom and hi-tech, import and export, construction and industry — alongside business people, private individuals and families seeking professional guidance through significant moments in their lives. Every client, large or small, receives the same level of commitment, availability and professionalism.",
    ],
    valuesTitle: "The values that lead us",
    values: [
      {
        title: "Accumulated Experience",
        body: "Over three decades of representation before every court and tribunal, and of negotiating complex matters.",
      },
      {
        title: "Personal Partner Involvement",
        body: "Every case is personally guided by one of the founding partners, from start to finish.",
      },
      {
        title: "Multidisciplinary Perspective",
        body: "Combining litigation, corporate and commercial law, real estate, labor law and family law.",
      },
      {
        title: "Trust & Transparency",
        body: "Clear fee agreements up front, honest communication and follow-through on what we promise.",
      },
    ],
  },
  team: {
    eyebrow: "The Team",
    title: "The people behind the firm",
    subtitle: "An experienced team of attorneys who guide you personally every step of the way.",
    viewProfile: "View full profile",
    backToTeam: "Back to the team",
    areasOfPractice: "Areas of Practice",
    members: [
      {
        slug: "ron-zahavi",
        name: "Ron Zahavi, Adv.",
        role: "Founding Partner",
        bio: "A member of the Israel Bar Association since 1996 and a leading commercial litigator in his field, representing companies and stakeholders in complex civil and commercial proceedings before every court and tribunal. He guides commercial companies and corporations from formation through to managing crises among shareholders, and holds broad expertise in real estate law, including dealings with the Israel Land Authority and TAMA 38 projects.",
        about: [
          "Ron Zahavi, Adv. is a founding partner of the firm and has been a member of the Israel Bar Association since 1996, and is regarded as a leading commercial litigator in his field. He represents companies, controlling shareholders and other stakeholders in complex civil and commercial proceedings before every court and tribunal — including class actions, shareholder disputes, and large-scale contractual and economic disputes — leading each matter from filing through to resolution.",
          "Alongside his litigation practice, he guides commercial companies and corporations throughout their lifecycle — from formation and founders' agreements, through ongoing commercial transactions and arrangements, to managing crises among shareholders and with suppliers, customers and creditors.",
          "He has also built broad expertise in real estate law in all its aspects — from sale and purchase transactions, through dealings with the Israel Land Authority, agricultural land and smallholdings, to TAMA 38 urban-renewal projects, co-ownership agreements and the dissolution of shared ownership — as well as representing clients in inheritance and estate disputes.",
          "His work is grounded in close, hands-on involvement in every case, alongside a commitment to availability and professional service.",
        ],
        practiceAreaSlugs: ["litigation", "commercial", "real-estate", "wills-estates"],
      },
      {
        slug: "anat-zahavi",
        name: "Anat Zahavi, Adv.",
        role: "Founding Partner",
        bio: "A member of the Israel Bar Association since 1996 and a certified labor-law mediator, with over two decades of experience representing employers. She leads the firm's preventive labor law practice, guiding leading Israeli companies in their day-to-day dealings with employees and regulators, and represents clients before labor courts nationwide.",
        about: [
          "Anat Zahavi, Adv. is a founding partner of the firm, a member of the Israel Bar Association since 1996, and a certified mediator in labor disputes, with over two decades of experience in the field. She specializes in representing employers — including some of Israel's largest companies, food and fast-food chains, telecom and hi-tech companies, import and export businesses, construction companies and private employers — in proceedings before the Regional and National Labor Courts throughout the country.",
          "Her practice is built on a preventive labor law approach, under which she advises clients on an ongoing basis on the applicability of collective agreements and extension orders, the employment and dismissal of pregnant employees, workplace sexual harassment, and disciplinary and criminal matters in the workplace, including proceedings before the Ministry of Economy under the Increased Enforcement of Labor Laws Law.",
          "Alongside her legal practice, she conducts workshops and training sessions for senior and mid-level management on labor relations and the managerial prerogative, equipping employers with the tools to manage their workforce properly while exercising their lawful management rights.",
        ],
        practiceAreaSlugs: ["labor-law"],
      },
    ],
  },
  publications: {
    eyebrow: "Publications & Media",
    title: "The Firm in the Media",
    subtitle:
      "Selected articles, publications and court decisions reflecting the firm's work and professional experience.",
    empty: "Content is being prepared and will be updated soon.",
    readMore: "Read full article",
    groups: [
      {
        heading: "Videos",
        videos: [
          {
            id: "H5QCZkxlM4Q",
            title: "Labor Law – Lawful Employee Termination",
            date: "June 2026",
          },
          {
            id: "kyQIXcARZUs",
            title: "Labor Law – Freelancer Rights",
            date: "June 2026",
          },
          {
            id: "ug6ziO-AJrI",
            title: 'Labor Law – "Invisible" Overtime',
            date: "June 2026",
          },
        ],
        items: [],
      },
      {
        heading: "Articles",
        items: [
          {
            title: "Shaming of an ultra-Orthodox student: her classmates ordered to pay NIS 144,000",
            source: "mako",
            field: "Defamation",
            date: "June 2026",
            excerpt:
              "The court awarded NIS 144,000 in damages in a shaming case brought against classmates who targeted an ultra-Orthodox student.",
            href: "https://www.mako.co.il/finances-law/law-general/Article-ec1aeec6ff4de91026.htm",
          },
          {
            title: "Employee accrued 134 vacation days against his contract — awarded nearly NIS 250,000",
            source: "ynet",
            field: "Labor Law",
            date: "November 2025",
            excerpt:
              "The labor court awarded an employee nearly a quarter of a million shekels for vacation days accrued contrary to the terms of his employment contract.",
            href: "https://www.mako.co.il/finances-law/work/Article-467b7835cc5ba91027.htm",
          },
          {
            title: "Owner of the prestigious \"Chateau Golan\" winery loses her full claim and is charged costs",
            source: "PsakDin",
            field: "Labor Law",
            date: "January 2018",
            excerpt:
              "A claim of some NIS 660,000, including reimbursement of severance pay, was dismissed in full, and the court ordered the claimant to pay substantial costs.",
            href: "https://www.mako.co.il/finances-law/work/Article-6fa34e38739d161006.htm",
          },
          {
            title: "Dismissed after refusing dangerous work — \"Minofei Avi\" to compensate",
            source: "mako",
            field: "Labor Law",
            date: "September 2018",
            excerpt:
              "An employee dismissed after refusing to perform work that endangered his safety was awarded compensation from the employer.",
            href: "https://www.ynet.co.il/articles/0,7340,L-5341000,00.html",
          },
          {
            title: "City of Bat Yam unlawfully deducted sick days from a teacher",
            source: "PsakDin",
            field: "Labor Law",
            date: "December 2017",
            excerpt:
              "The labor court ruled that the deduction of sick days was unlawful and ordered the municipality to refund the amounts.",
            href: "https://www.psakdin.co.il/Document/עיריית-בת-ים-ניכתה-מעובדת-שכר-שלא-כדין,-ביה-ד-פגיעה-חמורה",
          },
          {
            title: "Over a small letter: awarded severance pay even though they kept working",
            source: "mako",
            field: "Labor Law",
            date: "December 2017",
            excerpt:
              "Precise wording of a letter entitled the employees to severance pay, even though they continued in their roles.",
            href: "https://www.mako.co.il/finances-law/work/Article-6f353c59be48061006.htm?sCh=3d385dd2dd5d4110&pId=563116731",
          },
          {
            title: "Loan or investment? A family dispute over a farmstead will cost a couple NIS 1.4 million",
            source: "mako",
            field: "Real Estate",
            date: "August 2024",
            excerpt:
              "The dispute over the status of funds transferred to purchase the farmstead was decided, and the couple was ordered to pay some NIS 1.4 million.",
            href: "https://www.mako.co.il/finances-law/property-law/Article-e4121216f572191026.htm",
          },
          {
            title: "Allocation of a plot in a moshav fell through — and the buyer will be compensated",
            source: "Calcalist",
            field: "Real Estate & Cooperatives",
            date: "June 2024",
            excerpt:
              "The plot allocation in the moshav was never completed, and the court awarded the buyer compensation — an issue in the realm of cooperatives and urban renewal.",
            href: "https://www.ynet.co.il/economy/article/r1ctbmxs0",
          },
          {
            title: "A \"continuing son\" sued to share the farm with his brother — how did the court rule?",
            source: "Calcalist",
            field: "Real Estate",
            date: "November 2017",
            excerpt:
              "A real estate and inheritance dispute over the status of a \"continuing son\" required to share the agricultural farm with his brother.",
            href: "https://www.calcalist.co.il/local/articles/0,7340,L-3724291,00.html",
          },
          {
            title: "A diamond venture turned out to be a scam — the investor will get her money back",
            source: "ynet",
            field: "Family Law & Contracts",
            date: "August 2017",
            excerpt:
              "A diamond investment venture that proved to be a scam; the court ordered the investor's funds to be returned.",
            href: "https://www.calcalist.co.il/local/articles/0,7340,L-3719551,00.html",
          },
          {
            title: "Court approved: the electric company will run a free hotline and pay NIS 1.4 million to Holocaust survivors",
            source: "Calcalist",
            field: "Class Actions",
            date: "April 2017",
            excerpt:
              "As part of a class action settlement, the electric company will operate a free service hotline and set aside NIS 1.4 million for Holocaust survivors.",
            href: "https://www.calcalist.co.il/local/articles/0,7340,L-3711795,00.html",
          },
          {
            title: "Court approved a class action against Bezeq: allegedly misled customers in advertising",
            source: "ynet",
            field: "Class Actions",
            date: "May 2010",
            excerpt:
              "The court approved the hearing of a class action against Bezeq, alleging that it misled customers through its advertising.",
            href: "https://www.ynet.co.il/articles/0,7340,L-5061164,00.html",
          },
        ],
      },
    ],
  },
  contact: {
    eyebrow: "Get in Touch",
    title: "Let's start with a conversation",
    subtitle:
      "Leave your details and we'll get back to you shortly to schedule a consultation. All inquiries are kept in full confidence.",
    detailsTitle: "Contact details",
    phoneLabel: "Phone",
    phone: "+972-3-7555222",
    whatsappLabel: "WhatsApp",
    whatsappFloatingLabel: "Chat with us on WhatsApp",
    emailLabel: "Email",
    email: "office@zahavilaw.com",
    addressLabel: "Address",
    addressLines: ["Menachem Begin 7, Ramat Gan 5268102,", "Beit Gibor Sport, Floor 23"],
    hoursLabel: "Office hours",
    hours: "Sun–Thu, 09:00–18:00",
    form: {
      title: "Contact & meeting request form",
      name: "Full name",
      namePlaceholder: "John Doe",
      phone: "Phone",
      phonePlaceholder: "+972-50-0000000",
      email: "Email",
      emailPlaceholder: "you@example.com",
      subject: "Subject",
      subjectPlaceholder: "Choose an area",
      message: "Brief description",
      messagePlaceholder: "Tell us briefly how we can help...",
      preferredTime: "Preferred meeting day (optional)",
      preferredTimePlaceholder: "Choose a preferred date",
      preferredTimeNote:
        "* The requested date does not constitute a confirmed appointment. The meeting time will be set and confirmed in coordination with a member of our office.",
      preferredTimeWeekendError:
        "The office operates Sunday–Thursday only. Please choose a date that is not a Friday or Saturday.",
      consent:
        "I agree to be contacted regarding my inquiry. Details will be stored in accordance with the privacy policy.",
      submit: "Send inquiry",
      submitting: "Sending...",
      successTitle: "Your inquiry was sent successfully",
      successBody: "Thank you! We have received your inquiry and will get back to you as soon as possible.",
      errorTitle: "Something went wrong",
      errorBody: "We couldn't send your inquiry. Please try again or contact us by phone.",
      required: "Required field",
      invalidEmail: "Invalid email address",
      consentRequired: "Please confirm consent to continue",
      captchaRequired: "Please verify you're not a robot before sending",
      captchaError: "Security verification failed. Please try again.",
    },
  },
  footer: {
    tagline: "Professional, personal and precise legal representation.",
    quickLinks: "Quick links",
    practiceAreas: "Practice areas",
    contact: "Contact",
    rights: "All rights reserved",
    disclaimer:
      "The content on this site does not constitute legal advice and is no substitute for individual counsel. Do not rely on the site's content without consulting an attorney.",
    privacy: "Privacy Policy",
    accessibility: "Accessibility Statement",
    secure: "SSL Secured Site",
  },
  legal: {
    privacy: {
      title: "Privacy Policy",
      metaDescription:
        "The privacy policy of Zahavi - Pretty & Co. Law Offices — what information we collect on this site, how it is used, and your rights under Israel's Privacy Protection Law.",
      lastUpdated: "Last updated: June 2026",
      intro:
        "Zahavi - Pretty & Co. Law Offices (“the Firm”, “we”) respects your privacy and is committed to protecting the personal information you provide through this website. This policy explains what information we collect, how it is used, with whom it may be shared, and what your rights are.",
      sections: [
        {
          heading: "1. Information We Collect",
          paragraphs: [
            "We collect personal information that you choose to provide through the site's contact form, as well as limited technical information collected automatically for security and proper operation of the site.",
          ],
          items: [
            "Information you submit in the contact form: full name, phone number, email address, subject of inquiry, message content, and preferred contact time.",
            "Technical information collected automatically: IP address, browser type, and basic usage data — used to secure the site, prevent abuse, and operate the request rate-limiting mechanism.",
          ],
        },
        {
          heading: "2. How We Use the Information",
          items: [
            "Responding to inquiries and scheduling consultation meetings.",
            "Providing legal services and handling your matter, should you choose to engage the Firm.",
            "Maintaining the security of the site and preventing misuse of the contact form.",
            "Complying with legal obligations applicable to the Firm.",
          ],
        },
        {
          heading: "3. Basis for Providing Information and Consent",
          paragraphs: [
            "You provide your information voluntarily and are under no legal obligation to do so, but without basic contact details we will be unable to get back to you. By submitting the form and checking the consent box, you confirm the collection and use of your information in accordance with this policy.",
          ],
        },
        {
          heading: "4. Sharing Information with Third Parties",
          paragraphs: [
            "The Firm does not sell or rent your personal information. Your information may be processed and stored by service providers acting on our behalf, including:",
          ],
          items: [
            "A customer-relationship-management (CRM) provider, where inquiries are stored for tracking and handling.",
            "The site's hosting provider and the technical infrastructure on which it runs.",
            "Competent authorities or other parties — where required by law, court order, or to protect the Firm's rights.",
          ],
        },
        {
          heading: "5. Transfer of Information Outside Israel",
          paragraphs: [
            "Some of our service providers may store or process information on servers located outside Israel. In such cases we act to ensure the transfer is carried out in accordance with Israel's Privacy Protection Law and its regulations, and subject to appropriate safeguards.",
          ],
        },
        {
          heading: "6. Information Security",
          paragraphs: [
            "We apply reasonable security measures in accordance with the Privacy Protection Regulations (Data Security), 2017, including encryption of traffic between your browser and the site. However, no measure provides absolute protection, and we cannot fully guarantee the security of information transmitted over the internet.",
          ],
        },
        {
          heading: "7. Data Retention",
          paragraphs: [
            "Information is retained for as long as necessary to fulfil the purposes for which it was collected, including handling your inquiry and providing services, and for the period required to meet the legal and professional obligations applicable to the Firm. Thereafter the information is deleted or kept in a non-identifying form.",
          ],
        },
        {
          heading: "8. Your Rights",
          paragraphs: [
            "Under Israel's Privacy Protection Law, 5741-1981, you have the following rights:",
          ],
          items: [
            "The right to inspect information held about you in the Firm's databases.",
            "The right to request the correction of information that is inaccurate, incomplete, unclear, or out of date.",
            "The right to request deletion of the information, subject to the law and to the retention obligations applicable to the Firm.",
          ],
        },
        {
          heading: "9. Cookies and Analytics",
          paragraphs: [
            "The site uses technical means essential to its operation and security. In addition, the site may use Google Analytics to produce anonymous statistical data about how the site is used (such as the number of visitors and pages viewed), in order to improve the browsing experience. This service uses cookies and may collect usage data in accordance with Google's privacy policy. The site does not use advertising cookies for targeted advertising. You may configure your browser to block cookies, though this may affect some site features.",
          ],
        },
        {
          heading: "10. Changes to This Policy",
          paragraphs: [
            "The Firm may update this policy from time to time. The updated version will be published on this page and will apply from the date of its publication. We recommend reviewing the policy periodically.",
          ],
        },
        {
          heading: "11. Contact Us About Privacy",
          paragraphs: [
            "For any question or request regarding this policy or your personal information, you may contact us by phone at +972-3-7555222, by email at office@zahavilaw.com, or at Menachem Begin 7, Ramat Gan.",
          ],
        },
      ],
    },
    accessibility: {
      title: "Accessibility Statement",
      metaDescription:
        "The accessibility statement of the Zahavi - Pretty & Co. Law Offices website — our commitment to accessibility, the adjustments made, and how to contact our accessibility coordinator.",
      lastUpdated: "Last updated: June 2026",
      intro:
        "Zahavi - Pretty & Co. Law Offices attaches great importance to providing an accessible and equal service to the entire public, including persons with disabilities, and works to make its website accessible in accordance with the Equal Rights for Persons with Disabilities Law, 5758-1998, and the Equal Rights for Persons with Disabilities Regulations (Service Accessibility Adjustments), 5773-2013.",
      sections: [
        {
          heading: "Level of Accessibility",
          paragraphs: [
            "The site was built with the aim of meeting the requirements of Israeli Standard IS 5568 for web content accessibility, which is based on the WCAG 2.0 guidelines at Level AA. We continuously work to improve the site's level of accessibility.",
          ],
        },
        {
          heading: "Accessibility Adjustments Implemented",
          items: [
            "Full keyboard navigation, including a “skip to content” link at the top of every page.",
            "Semantic page structure with a correct heading hierarchy to support screen readers.",
            "Alternative text for images and informative graphic icons.",
            "Sufficient color contrast between text and background.",
            "Clear focus indication for keyboard users.",
            "Full support for Hebrew (right-to-left) and English (left-to-right) directionality.",
            "Responsive design adapted to a range of screen sizes and devices.",
            "Respecting the user's preference for reduced motion (prefers-reduced-motion).",
          ],
        },
        {
          heading: "Known Limitations",
          paragraphs: [
            "Despite our efforts to make all components of the site accessible, some parts or content may not yet be fully accessible, or may include third-party content not under the Firm's control. We continue to work on fixing and improving accessibility on an ongoing basis.",
          ],
        },
        {
          heading: "Accessibility Inquiries and Coordinator",
          paragraphs: [
            "If you encounter any difficulty browsing the site, or have a comment or request regarding accessibility, we would be glad to hear from you and will make every effort to respond promptly.",
            "Accessibility coordinator: you may contact us by phone at +972-3-7555222, by email at office@zahavilaw.com, or at Menachem Begin 7, Ramat Gan.",
          ],
        },
      ],
    },
  },
};

export default en;
