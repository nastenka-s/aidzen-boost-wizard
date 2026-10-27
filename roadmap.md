# Pinterest updates
- [x] Add varied visual styles and list categories.
- [x] Ground dated events in astronomical calculations and clearly label traditional meanings.
- [x] Limit generation to three pins per Moscow day and adjust schedule.
- [x] Test rules and verify deployed generation and RSS output.

# Dzen direct publication
- [x] Remove the forced-draft publication category and add a regression test.
- [x] Deploy the RSS generator and regenerate the static feed.
- [x] Verify publication categories in the updated feed (20 articles, no forced drafts).
- [ ] Publish the updated static feed on the public domain — awaiting user publication; both public addresses still serve the previous version.

# Three daily blog articles
- [x] Study and cluster the 225 uploaded keywords into source-grounded educational topics.
- [x] Schedule calculated tomorrow horoscope at 09:00, astrology lesson at 13:00 and numerology lesson at 18:00 Moscow; retries at 11:00, 15:00, 21:00.
- [x] Add atomic daily slots, global lease, provider circuit breaker, saved payload recovery and factual validation; seven editorial tests pass, horoscope text uses calculated facts and curated interpretations only.
- [ ] Verify all three articles on the public website — GitHub Deploy over SSH fails; authenticated deployment logs/server access required.

# Horoscope first and today's articles
- [x] Move tomorrow horoscope to 09:00 Moscow, astrology to 13:00 and numerology to 18:00; all three SQL schedule tests pass.
- [x] Trigger today's three categories, skipping completed slots, and verify results — all three returned HTTP 200 daily_slots_complete; today's slots are successful.

# Blog article cover images
- [x] Use relevant symbols or people for educational covers; include headline and target date on horoscope covers; cover tests pass.
- [x] Replace today's three covers with working public images and update Dzen enclosures without changing article text.
- [x] Verify image responses and refresh the static Dzen feed; three covers return JPEG 1264x848.
- [ ] Publish refreshed static feed on aidzen.ru and www.aidzen.ru — both still serve the old feed; public deployment is required.

# Dzen RSS website footer
- [x] Replace RSS-only final CTA with aidzen.ru and three free calculations; tests pass, all 20 deployed source items verified, static copy refreshed.
- [ ] Publish the refreshed public RSS footer — www.aidzen.ru still serves the old static feed; awaiting website deployment.

# November horoscope draft revision
- [x] Prepare a versioned unpublished draft without sources/methodology, with a personal forecast CTA to aidzen.ru and titled cover.
- [x] Stop appending visible sources/methodology to future articles while retaining internal factual grounding; eight regression tests pass.

# Approved November publication and daily voice
- [ ] Close public access to internal competitor posts before publishing, preserving automated jobs and adding a permission regression test.
- [ ] Publish the approved November article with its cover, blog entry, sitemap and RSS.
- [ ] Replace daily horoscope boilerplate with varied, concrete, grounded conversational prose; test and deploy for future forecasts only.
- [ ] Request website publication and verify the article in preview.