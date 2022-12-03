SELECT 
    p.`tag`, p.`real_name`, p.`nationality`, t.`team_name`
FROM
    players p
		JOIN
    members m USING (`player_id`)
        JOIN
    teams t USING (`team_id`)
WHERE
    p.`game_race` = 'Z'
        AND m.`end_date` IS NULL
        AND t.`disbanded` IS NULL
