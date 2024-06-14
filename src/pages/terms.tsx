import React from 'react';
import { siteConfig } from '../config/site';

const TermsOfService: React.FC = () => {
  const currentDate = new Date();
  const formattedDate = currentDate.toISOString().split('T')[0];

  return (
    <section className="bg-black min-h-screen">
      <div className=" max-w-4xl mx-auto px-6 py-10">
        <div>
          <h1 className="text-white text-2xl font-semibold text-center">{siteConfig.siteName} Terms of Service</h1>
          <p className=" text-white text-xl pt-4">As at: {formattedDate}</p>

          <div className=" text-slate-100 pt-10">
            <p>
              These Terms of Service('Terms') govern your use of{' '}
              <span className=" font-semibold">{siteConfig.siteName.toUpperCase()}(the 'Service')</span>, an open-source
              project created and maintained by React ChatBotify Team.
            </p>

            <p className="pt-4">
              <span className="font-semibold text-lg">1. Acceptance of Terms:</span> - By accessing or using our
              Service, you agree to be bound by these Terms. If you do not agree with any part of these terms, please do
              not use our Services.
            </p>

            <p className="pt-4">
              <span className="font-semibold text-lg">2. License:</span> - The Service is Licensed under MIT License.
              You are free to use, modify, and distribute the Service in accordance with the terms of the applicable
              license.
            </p>

            <p className="pt-4">
              <span className="font-semibold text-lg">3. Contributions:</span> - By contributing to the Service, you
              grant us a perpetual, irrevocable, worldWide, royalty-free license to use, modify, and distribute your
              Contributions as part of the Service.
            </p>

            <p className="pt-4">
              <span className="font-semibold text-lg">4. No Warranty:</span> - The Service is provided "as is", without
              Warranty of any kind, express or implied. We disclaim any warranty of merchantability, fitness for a
              particular purpose, or non-infringement.
            </p>

            <p className="pt-4">
              <span className="font-semibold text-lg">5. Limitation of Liability:</span> - In no event shall we be
              liable for any direct, indeirect, incidental, special, exemplary, or consequential damages arising out of
              the use or inability to use the Service.
            </p>

            <p className="pt-4">
              <span className="font-semibold text-lg">6. Indemnification:</span> - You agree to indemnify and hold us
              harmless from any claims, damages, liabilities, costs, or expenses arising out of your use of the Service
              or your violation of these Terms.
            </p>

            <p className="pt-4">
              <span className="font-semibold text-lg">7. Gorverning Law:</span> - These Terms shall be governed by and
              construed in accordance with the laws of [Your jurisdiction], without regards to its conflict of law
              provisions.
            </p>

            <p className="pt-4">
              <span className="font-semibold text-lg">8. Modifications:</span> - We reserve the right to modify or
              replace these Terms at any time. Your continued use of the Service after any such changes constitutes your
              acceptance of the new Terms.
            </p>

            <p className="pt-4">
              <span className="font-semibold text-lg">9. Contact Us:</span> - If you have any questions about these
              Terms, please contact us at or via [contact Email].
            </p>

            <p className="pt-6 text-center text-xs">Copyright (c) 2024 Tan Jin</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TermsOfService;
