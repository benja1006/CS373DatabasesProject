SELECT DISTINCT
    P.`tag`, P.`game_race`
FROM
    players P
WHERE
    P.`player_id` IN (SELECT 
            E.`player_id`
        FROM
            earnings E
                INNER JOIN
            tournaments T USING (`tournament_id`)
        WHERE
            T.`major` = 1 AND T.`region` = 'EU'
                AND E.`position` = 1)
        AND P.`player_id` IN (SELECT 
            E.`player_id`
        FROM
            earnings E
                INNER JOIN
            tournaments T USING (`tournament_id`)
        WHERE
            T.`major` = 1 AND T.`region` = 'KR'
                AND E.`position` = 1)
        AND P.`player_id` IN (SELECT 
            E.`player_id`
        FROM
            earnings E
                INNER JOIN
            tournaments T USING (`tournament_id`)
        WHERE
            T.`major` = 1 AND T.`region` = 'AM'
                AND E.`position` = 1);