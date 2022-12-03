SELECT 
    T.`team_name`, T.`founded`, Protoss, Terran, Zerg
FROM
    teams T
        LEFT JOIN
    (SELECT 
        T.`team_name`, COUNT(*) AS Protoss
    FROM
        teams T
    INNER JOIN members M USING (`team_id`)
    INNER JOIN players P USING (`player_id`)
    WHERE
        P.`game_race` = 'p' AND M.`end_date` IS NULL
    GROUP BY T.`team_name`) AS prot USING (`team_name`)
        LEFT JOIN
    (SELECT 
        T.`team_name`, COUNT(*) AS Terran
    FROM
        teams T
    INNER JOIN members M USING (`team_id`)
    INNER JOIN players P USING (`player_id`)
    WHERE
        P.`game_race` = 't' AND M.`end_date` IS NULL
    GROUP BY T.`team_name`) AS terr USING (`team_name`)
        LEFT JOIN
    (SELECT 
        T.`team_name`, COUNT(*) AS Zerg
    FROM
        teams T
    INNER JOIN members M USING (`team_id`)
    INNER JOIN players P USING (`player_id`)
    WHERE
        P.`game_race` = 'z' AND M.`end_date` IS NULL
    GROUP BY T.`team_name`) AS zer USING (`team_name`)
    WHERE T.`founded` < '2011-01-01'
    AND T.`disbanded` IS NULL
    ORDER BY T.`team_name` ASC;
