import S from "@sanity/desk-tool/structure-builder";
import { FaCog, FaHome } from "react-icons/fa";

export default () =>
  S.list()
    .title("Local events")
    .items([
      S.listItem().title("All events")
        .child(
          S.documentList()
            .title("Events")
            .filter(`_type == 'event'`)
            .defaultOrdering([{field: "startTime", direction: "asc"}])
        ),
      S.listItem().title("All venues").child(S.documentTypeList("venue")),
      S.listItem()
        .title("Events by venue")
        .child(
          S.documentTypeList("venue")
            .title("Venue")
            .child((venueId) =>
              S.documentList()
                .title("Events")
                .filter(`_type == 'event' && $venueId == venue._ref`)
                .schemaType("event")
                .params({ venueId })
                
            )
        ),
      S.divider(),
      // S.listItem()
      //   .title("settings")
      //   .child(S.documentTypeList("siteSettings")),
      S.listItem()
        .title("Site settings")
        .icon(FaCog)
        .child(
          S.editor().id("siteSettings").schemaType("siteSettings").documentId("singleton-settings")
        ),
      S.listItem()
        .title("Home page")
        .icon(FaHome)
        .child(
          S.editor()
            .id("indexPage")
            .title("Editing home page content (/)")
            .schemaType("indexPage")
            .documentId("singleton-indexPage")
        ),
    ]);
