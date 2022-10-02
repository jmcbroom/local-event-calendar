import React, { useEffect, useState } from "react";
import { DashboardWidget } from "@sanity/dashboard";
import { Button, Flex, Card, Code } from "@sanity/ui";
import sanityClient from "part:@sanity/base/client";

function RebuildSite() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [hookUrl, setHookUrl] = useState(null);

  useEffect(() => {
    let url$ = sanityClient.observable.fetch(`*[_type == 'siteSettings'][0].webhookUrl`).subscribe(setHookUrl);
    return () => url$.unsubscribe()
  }, []);

  const rebuildSite = () => {
    fetch(hookUrl, {
      method: "POST",
    })
      .then(function (res) {
        setIsLoading(false);
      })
      .catch(function (err) {
        setError(err) && setIsLoading(false);
      });
  };

  return (
      hookUrl && <DashboardWidget
        header="Rebuild Netlify site"
        footer={
          <Flex direction="column" align="stretch">
            <Button
              flex={1}
              paddingX={2}
              paddingY={4}
              mode="bleed"
              tone="primary"
              text="Redeploy site"
              loading={isLoading}
              onClick={rebuildSite}
            />
          </Flex>
        }
      >
        {error && (
          <Card paddingX={3} paddingY={4} tone="critical">
            <Code>{JSON.stringify(error, null, 2)}</Code>
          </Card>
        )}
        {!error && (
          <Card paddingX={3} paddingY={4} tone="critical">
            <p>Press the button below to rebuild your site.</p>
          </Card>
        )}
      </DashboardWidget>
  );
}

export default {
  name: "rebuild-site",
  component: RebuildSite,
};
