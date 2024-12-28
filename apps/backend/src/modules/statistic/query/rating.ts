export const RATING_QUERY = `
      CASE
        WHEN statistic.smash IS NULL AND statistic.pass IS NULL THEN -1
        ELSE (statistic.smash * 100) / (statistic.smash + statistic.pass)
      END
`