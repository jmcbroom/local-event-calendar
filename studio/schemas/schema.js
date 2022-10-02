// First, we must import the schema creator
import createSchema from "part:@sanity/base/schema-creator";

// Then import schema types from any plugins that might expose them
import schemaTypes from "all:part:@sanity/base/schema-type";
import blockContent from "./blockContent";

// Import the singletons
import siteSettings from "./siteSettings";
import venue from "./venue";
import event from "./events/event";
import movie from './events/movie';
import music from "./events/music";

export default createSchema({
  name: "default",
  types: schemaTypes.concat([

    // base type
    blockContent,

    // singletons
    siteSettings,

    // models
    venue,

    // event types
    event,
    movie,
    music
    
  ]),
});
