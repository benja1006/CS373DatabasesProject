SELECT 
    p.`tag`, p.`real_name`, p.`nationality`, t.`team_name`
FROM
    players p
        INNER JOIN
    members m USING (`player_id`)
        INNER JOIN
    teams t USING (`team_id`)
WHERE
    p.`game_race` = 'Z'
        AND m.`end_date` IS NULL
        AND t.`disbanded` IS NULL
