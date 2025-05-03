import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPAGEById } from "../../store/UserStore/PageContent/action";
const TermsOfServices = () => {
  const PageContent = useSelector((state) => state.PageContent);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(
      getPAGEById({ data: { id: "2eda1bdd-fb86-415c-865e-6656a962b4bc" } })
    );
  }, []);
  return (
    <div className="common-container">
      {/* <h2 className="ml-5">TERMS OF SERVICE</h2>
      <div className="common-container">
        <p>
          Welcome to PawWalker. Please read the conditions carefully before you
          use our website&ndash;{" "}
          <u>
            <a href="http://www.pawwalker.in/">www.pawwalker.in</a>
          </u>{" "}
          (&ldquo;website&rdquo;) through any electronic device. By continuing
          to use our website, you are hereby agreeing to comply with and be
          bound by the following terms and conditions of use, which together
          with our privacy policy govern our relationship with you in relation
          to this website.
        </p>
        <p>
          In the event there is a conflict between the terms and conditions
          specified herein and the provisions of any other document executed
          between the parties hereto, the terms and conditions specified herein
          would prevail.
        </p>
        <ol>
          <li>
            <h4>DEFINITIONS</h4>
          </li>
        </ol>
        <p>
          <span lang="en-US">
            For the purpose of this Agreement, unless the context otherwise
            requires, the capitalized words and phrases shall having the meaning
            as assigned hereunder
          </span>
          .
        </p>
        <ol>
          <ol>
            <li>
              <p>
                "<strong>We</strong>", "<strong>us</strong>", "
                <strong>our</strong>", &ldquo;<strong>PawWalker</strong>&rdquo;
                shall mean PawWalker, its employees, authorised agents that
                operate the website and facilitate the Customers in purchasing
                products or services offered by the Vendors on the website.
              </p>
            </li>
            <li>
              <p>
                &ldquo;<strong>You</strong>&rdquo;, &ldquo;<strong>your</strong>
                &rdquo;, &ldquo;<strong>Customer</strong>&rdquo;, &ldquo;
                <strong>User</strong>&rdquo; shall refer to any person, natural
                or legal, who uses the website for the purpose of browsing, or
                placing order for any Product(s)/Service(s) by way of any
                electronic device.
              </p>
            </li>
            <li>
              <p>
                &ldquo;
                <span lang="en-US">
                  <strong>Delivery Cost</strong>
                </span>
                <span lang="en-US">
                  &rdquo; shall mean the cost payable by the Customer to
                  pawwalker for delivering the product(s) of the vendor
                  purchased by the Customer from pawwalker website.
                </span>
              </p>
            </li>
            <li>
              <p>
                "<strong>Prohibited Item(s)</strong>" means any
                Product(s)/Service(s) which are prohibited by Applicable Law.
              </p>
            </li>
            <li>
              <p>
                &ldquo;<strong>Product(s)</strong>&rdquo;
                <span lang="en-US">
                  shall mean the merchandise articles or goods put up for sale
                  by the Vendor on PawWalker Website
                </span>
              </p>
            </li>
            <li>
              <p>
                &ldquo;
                <span lang="en-US">
                  <strong>Service(s)</strong>
                </span>
                <span lang="en-US">
                  &rdquo; shall mean the services offered by the Vendor on the
                  PawWalker Website.
                </span>
              </p>
            </li>
            <li>
              <p>
                &ldquo;
                <span lang="en-US">
                  <strong>Order</strong>
                </span>
                <span lang="en-US">
                  &rdquo; shall mean order placed by the Customer to purchase
                  the Product(s) or booking of Service(s) of the Vendor through
                  PawWalker Website as per the indicated Price and terms &amp;
                  conditions.
                </span>
              </p>
            </li>
            <li>
              <p>
                &ldquo;
                <span lang="en-US">
                  <strong>Vendor(s)</strong>
                </span>
                <span lang="en-US">
                  &rdquo; for the purpose of this agreement shall mean persons,
                  organisations, including clinics, offering
                  product(s)/service(s) on the PawWalker Website.
                </span>
              </p>
            </li>
            <li>
              <p>
                &ldquo;<strong>Applicable Law</strong>&rdquo; shall mean all
                laws, statutes, ordinance, regulations, guidelines, policies,
                rules, bye-laws, notifications, directions, directives and
                orders or other governmental restrictions or any similar form of
                decision of, or determination by, or any interpretation,
                administration and other pronouncements having the effect of law
                of the Republic of India or any other applicable jurisdiction by
                state, municipality, court, tribunal, government, ministry,
                department, commission, arbitrator or board or such other body
                which has the force of law in India.
              </p>
            </li>
          </ol>
        </ol>
        <p>
          <strong>2. ELIGIBILITY OF USER(S)</strong>
        </p>
        <ol>
          <li>
            <p>
              PawWalker provides technology based service which are available
              only to those persons, natural or legal, who can form legally
              binding contracts under the Applicable Law. Therefore, user(s)
              must be at least 18 years of age to be eligible to use our
              Services.
            </p>
          </li>
          <li>
            <p>
              PawWalker advises its User(s) that while accessing the web site,
              they must follow/abide by the related laws. PawWalker is not
              responsible for the possible consequences caused by your behaviour
              during use of our website.
            </p>
          </li>
          <li>
            <p>
              PawWalker reserves the right to suspend/terminate any user(s) from
              accessing our website without notice.
            </p>
          </li>
        </ol>
        <p>
          <strong>3. USER(S) AGREEMENT</strong>
        </p>
        <ol>
          <li>
            <p>
              This agreement applies to user(s) if user(s) are visitors,
              registered - free or paid user(s) who access the web site for any
              purpose.
            </p>
          </li>
          <li>
            <p>
              It also applies to any legal entity which may be represented by
              you under actual or apparent authority.
            </p>
          </li>
          <li>
            <p>
              User(s) may use this site solely for their own personal or
              internal purposes.
            </p>
          </li>
          <li>
            <p>
              This agreement applies to all PawWalker Services offered on the
              web site, collectively with any additional terms and condition
              that may be applicable to the specific service used/accessed by
              user(s). In the event of a conflict or inconsistency between any
              provision of the terms and conditions mentioned herein with those
              of the particular service, the provisions of the terms and
              conditions applicable to such specific Services shall prevail.
            </p>
          </li>
        </ol>
        <p>
          <strong>
            4. TERMS, CONDITIONS &amp; your obligations FOR THE USE OF OUR
            WEBSITE
          </strong>
        </p>
        <ol>
          <li>
            <p>
              PawWalker offers products/services of vendors/clinics by placing
              an order through this platform. By accessing this website, you
              hereby agree to all the terms set forth in this agreement.
            </p>
          </li>
          <li>
            <p>PawWalker has all rights to refuse service to any customer.</p>
          </li>
          <li>
            <p>
              PawWalker shall deliver product(s) or provide service(s) listed on
              the website only within the city of Bengaluru.
            </p>
          </li>
          <li>
            <p>
              All product(s) or service(s) listed on the website are subject to
              availability.
            </p>
          </li>
          <li>
            <p>
              The time slots and doctors provided while booking of service(s) of
              Vendor shall be treated as the preferred time or doctor, as the
              case may be, of the User(s). The user(s) acknowledges that the
              time slots or doctor, as the case may be, are not to be treated as
              guaranteed.
            </p>
          </li>
          <li>
            <p>
              PawWalker reserves the right to reject all or any part of an
              order, even if you have placed on order for the said
              product(s)/service(s).
            </p>
          </li>
          <li>
            <p>
              PawWalker reserves the right to discontinue any
              product(s)/service(s) without any notice to you, even if you have
              already placed an order for the said product(s)/service(s).
            </p>
          </li>
          <li>
            <p>
              PawWalker is an intermediary that facilitates online transaction
              between User and Vendor. PawWalker is not responsible for any
              variation in pictorial representation or description of
              product(s)/service(s) as PawWalker only provides the description
              and pictorial representation as per the instructions of Vendor(s).
            </p>
          </li>
          <li>
            <p>
              The prices and description of the prodcut(s)/service(s) are
              subject to change without any notice to the User, at the sole
              discretion of PawWalker.
            </p>
          </li>
          <li>
            <p>
              PawWalker is not responsible for any modification to
              product(s)/service(s) including price, discontinuance, etc. by the
              Vendors.
            </p>
          </li>
          <li>
            <p>
              It is the sole responsibility of the user to read the instructions
              written on description/packaging of a product(s)/service before
              placing an order for the same.
            </p>
          </li>
          <li>
            <p>
              Offers available on the PawWalker website shall be, in addition to
              this agreement, subject to the terms and conditions as may be
              listed on the PawWalker in relation to such offers.
            </p>
          </li>
          <li>
            <p>
              You must not use our website in any manner that may cause, or is
              likely to cause, interruption, damage, or disruption of our
              website or access to our website to other user(s).
            </p>
          </li>
          <li>
            <p>
              You must use our website for lawful purposes alone. You cannot use
              our website for the following:
            </p>
            <ol type="a">
              <li>
                <p>
                  For copying, reproducing, reselling or redistributing any
                  product(s) ordered from the PawWalker Website.
                </p>
              </li>
              <li>
                <p>
                  For fraudulent purposes or for any purpose that is opposed to
                  law.
                </p>
              </li>
              <li>
                <p>To cause annoyance or inconvenience.</p>
              </li>
            </ol>
          </li>
        </ol>
        <p>
          <strong>5. INTELLECTUAL PROPERTY RIGHTS</strong>
        </p>
        <ol>
          <li>
            <p>
              PawWalker is the sole owner or lawful licensee of all the rights
              to the website and its content. Website content means its design,
              layout, text, images, graphics, sound, video etc., but shall not
              include the product(s) or service(s) offered by the Vendor.
            </p>
          </li>
          <li>
            <p>
              The website content embodies trade secrets and intellectual
              property rights protected under worldwide copyright and other
              laws. All title, ownership and intellectual property rights in the
              website and its content shall remain with PawWalker.
            </p>
          </li>
          <li>
            <p>
              All rights, not otherwise claimed under this agreement or by
              PawWalker, are hereby reserved.
            </p>
          </li>
          <li>
            <p>
              The information contained in this website is intended, solely to
              provide general information for the personal use of the reader,
              who accepts full responsibility for its use.
            </p>
          </li>
          <li>
            <p>
              PawWalker does not represent or endorse the accuracy or
              reliability of any information, or advertisements contained on
              Product(s)/Service(s) listed on our website.
            </p>
          </li>
          <li>
            <p>
              PawWalker does not endorse the quality of any products,
              information or other materials displayed, or obtained by you as a
              result of an advertisement or any other information or offer which
              are listed on our website.
            </p>
          </li>
          <li>
            <p>
              We accept no responsibility for any errors or omissions, or for
              the results obtained from the use of this information.
            </p>
          </li>
          <li>
            <p>
              All information in this website is provided on an "AS IS" basis
              with no guarantee of completeness, accuracy, timeliness or of the
              results obtained from the use of this information, and without
              warranty of any kind, express or implied, including, but not
              limited to warranties of performance, merchantability and fitness
              for a particular purpose.
            </p>
          </li>
          <li>
            <p>
              Nothing herein shall to any extent substitute for the independent
              investigations and the sound technical and business judgment of
              the user(s). In no event shall PawWalker be liable for any direct,
              indirect, incidental, punitive, or consequential damages of any
              kind whatsoever with respect to the Service.
            </p>
          </li>
          <li>
            <p>
              User(s) of this site must hereby acknowledge that any reliance
              upon any content shall be at their own risk.
            </p>
          </li>
          <li>
            <p>
              <strong>Trademark</strong>
            </p>
          </li>
        </ol>
        <p>
          All related icons and logos are registered trademarks or trademarks or
          service marks of PawWalker in various jurisdictions and are protected
          under applicable copyright, trademark and other proprietary rights
          laws. The unauthorized copying, modification, use or publication of
          these marks is strictly prohibited.
        </p>
        <ol start="12">
          <li>
            <p>
              <strong>Copyright</strong>
            </p>
          </li>
        </ol>
        <p>
          All content on this web site is the copyright of PawWalker except the
          third party content and link to third party web sites on our
          app/website.
        </p>
        <ol start="13">
          <li>
            <p>
              Systematic retrieval of PawWalker content to create or compile,
              directly or indirectly, a collection, compilation, database or
              directory (whether through robots, spiders, automatic devices or
              manual processes) without written permission from PawWalker is
              prohibited.
            </p>
          </li>
          <li>
            <p>
              In addition, use of the content for any purpose not expressly
              permitted in this Agreement is prohibited and PawWalker reserves
              the right to initiate appropriate legal proceedings as against the
              user(s).
            </p>
          </li>
          <li>
            <p>
              As a condition of your access to and use of our website, you agree
              that you will not use the web ite service to infringe the
              intellectual property rights of others in any way.
            </p>
          </li>
          <li>
            <p>
              PawWalker reserves the right to terminate the account/access of a
              user(s) upon any infringement of the rights of others in
              conjunction with use of our website, or if PawWalker believes that
              user(s) conduct is harmful to the interests of PawWalker, its
              affiliates, or other users, or for any other reason in PawWalker's
              sole discretion, with or without cause.
            </p>
          </li>
          <li>
            <p>
              You shall be liable to indemnify PawWalker for any losses or
              expenses incurred by PawWalker due to any infringement of
              intellectual property rights owned by PawWalker without
              prejudicing PawWalker&rsquo;s right to bring any other legal
              action against you.
            </p>
          </li>
        </ol>
        <p>
          <strong>6. LINKS TO THIRD PARTY SITES</strong>
        </p>
        <ol>
          <li>
            <p>
              Links to any third party sites provided on our website is only for
              the purpose of your convenience and PawWalker does has not have
              any control over such sites i.e content and resources provided by
              them.
            </p>
          </li>
          <li>
            <p>
              PawWalker may allow user(s) access to content, products or
              Services offered by third parties through hyperlinks (in the form
              of word link, banners, channels or otherwise) to such Third
              Party's web site. You are cautioned to read such sites' terms and
              conditions and/or privacy policies before using such sites in
              order to be aware of the terms and conditions of your use of such
              sites.
            </p>
          </li>
          <li>
            <p>
              You hereby acknowledge that PawWalker has no control over such
              third party's site, or does not monitor such sites, and PawWalker
              shall not be responsible or liable to anyone for such third party
              site, or any content, products or Services made available on such
              a site.
            </p>
          </li>
          <li>
            <p>
              User(s) shall review PawWalker&rsquo;s Privacy Policy and abide by
              PawWalker&rsquo;s Privacy Policy at the time of the User(s)
              interaction with PawWalker, with respect to and concerning any
              information and data.
            </p>
          </li>
        </ol>
        <p>
          <strong>7. MARKETING</strong>
        </p>
        <p>
          On placing any order(s) for a service(s)/product(s) are you are hereby
          agreeing to receive promotional emails, messages, calls from PawWalker
          or Vendors. However, you may choose to opt-out of the same by writing
          an email to info@pawwalker.in.
        </p>
        <p>
          <strong>8. TERMINATION</strong>
        </p>
        <p>
          Most content and some of the features on the website are made
          available to visitors free of charge. However, PawWalker reserves the
          right to terminate access to certain areas or features of the website
          at any time for any reason, with or without notice. PawWalker also
          reserves the universal right to deny access to particular users to
          any/all of its access to the website without any prior
          notice/explanation in order to protect the interests of PawWalker
          and/or other visitors to the web site. PawWalker reserves the right to
          limit, deny or create different access to the website and its features
          with respect to different user(s), or to change any of the features or
          introduce new features without prior notice.
        </p>
        <p>
          <strong>9. USAGE of platform</strong>
        </p>
        <ol>
          <li>
            <p>
              PawWalker is not responsible for any comment or post made by any
              user(s). PawWalker does not have the ability to control the nature
              of the user-generated contents.
            </p>
          </li>
          <li>
            <p>
              User(s) are solely responsible for any interactions with other
              user(s).
            </p>
          </li>
          <li>
            <p>
              PawWalker is not responsible or liable for any damage or harm that
              is a resultant of user-generated posts or comments.
            </p>
          </li>
          <li>
            <p>
              User(s) are solely responsible for their respective posts or
              comments.
            </p>
          </li>
        </ol>
        <p>
          <strong>10. CONFIDENTIALITY</strong>
        </p>
        <p>
          User(s) shall not disclose any information received under the contract
          of service with PawWAlker to any third party. Access to any
          information which pertains to business of PawWalker shall be kept
          confidential to the extent it might adversely impact PawWalker&rsquo;s
          business. User(s) shall be liable to indemnify WHEELZ against any loss
          of business or reputation due to the act of the user(s).
        </p>
        <p>
          <strong>11. AMENDMENT TO USER(S) AGREEMENT</strong>
        </p>
        <p>
          PawWalker may change, modify, amend, or update this agreement from
          time to time without any prior intimation/notice to user(s) and the
          amended and restated terms and conditions of use shall be effective
          immediately on posting of the said amended terms on our website. If
          you do not agree to the amendments, you must stop using our website.
          Your continuous use of our website will signify your acceptance of the
          changed terms. User(s) shall also be bound by any amendment made in
          any policy or agreement from time to time, referred to in this Terms
          of Service.
        </p>
        <p>
          <strong>12. GOVERNING LAW AND JURISDICTION</strong>
        </p>
        <p>
          These Terms of Service shall be governed by and construed in
          accordance with the laws of the India, without regard to the
          principles of conflict of laws. The courts of [Bangalore] shall have
          exclusive jurisdiction over any disputes, differences or claims
          arising out of or in connection with these Terms of Service or any
          Services provided by us pursuant to these Terms of Service
        </p>
        <p>
          <strong>13. NOTICE</strong>
        </p>
        <p>
          If you believe that your rights are violated by any
          product(s)/service(s) or information or comment on the PawWalker
          website, you may submit a complaint to the grievance officer by
          writing a mail to info@pawwalker.in
        </p>
        <p>
          <strong>14. ENTIRE AGREEMENT</strong>
        </p>
        <p>
          This Agreement embodies the entire agreement and understanding of the
          Parties and supersedes any and all other prior and contemporaneous
          agreements, arrangements and understandings (whether written or oral)
          between the Parties with respect to its subject matter.
        </p>
        <p>
          <strong>15. SURVIVAL</strong>
        </p>
        <p>
          <span lang="en-US">
            Any provision or obligation, in view of its nature, survives the
            termination of this Agreement, will continue to be binding on the
            Parties to this Agreement.{" "}
          </span>
        </p>
        <p>
          <span lang="en-US">
            <strong>16. SEVERABLITY </strong>
          </span>
        </p>
        <p>
          <span lang="en-US">
            In the event any provision, obligation, or terms is found to be
            invalid, illegal or unenforceable, only that said provision,
            obligation, or term will be inoperative, and not the entire
            Agreement. The remaining provisions of this Agreement shall be
            unaffected thereby and shall continue to be valid and enforceable.{" "}
          </span>
        </p>
        <p>
          <strong>17. ACCESSIBILITY </strong>
        </p>
        <p>
          No representation is made that the platform or products are
          appropriate or available for use in locations outside India. User(s)
          who access the platform from outside India do so at their own risk and
          initiative and must bear all responsibility for compliance with any
          applicable local laws.
        </p>
        <p>
          <strong>18. DISCLAIMER</strong>
        </p>
        <p>
          The information contained in this website is for general information
          purposes only. The information is provided by PawWalker and while we
          endeavor to keep the information up to date and correct, we make no
          representations or warranties of any kind, express or implied, about
          the completeness, accuracy, reliability, suitability or availability
          with respect to the website or the information, products, services, or
          related graphics contained on the website for any purpose. Any
          reliance you place on such information is therefore strictly at your
          own risk.
        </p>
        <p>
          In no event will we be liable for any loss or damage including without
          limitation, indirect or consequential loss or damage, or any loss or
          damage whatsoever arising from loss of data or profits arising out of,
          or in connection with, the use of this website.
        </p>
        <p>
          Through this website you are able to link to other websites which are
          not under the control of PawWalker. We have no control over the
          nature, content and availability of those sites. The inclusion of any
          links does not necessarily imply a recommendation or endorse the views
          expressed within them.
        </p>
        <p>
          Every effort is made to keep the portal up and running smoothly.
          However, PawWalker takes no responsibility for, and will not be liable
          for, the portal being temporarily unavailable due to technical issues
          beyond our control.
        </p>
      </div> */}
      <div
        className="responsive-policy-content"
        dangerouslySetInnerHTML={{
          __html: PageContent?.PageContentDetails?.page_content,
        }}
      />
    </div>
  );
};

export default TermsOfServices;
