SELECT
    P.`real_name`, P.`game_race`, T.`tournament_name`
FROM
    players P
		JOIN
    matches M ON P.`player_id` = M.`playerA_id`
		JOIN
    tournaments T USING (`tournament_id`)
WHERE
    M.`playerA_score` >= M.`playerB_score` + 3
 
 UNION
SELECT
    P.`real_name`, P.`game_race`, T.`tournament_name`
FROM
    players P
		JOIN
    matches M ON P.`player_id` = M.`playerB_id`
		JOIN
    tournaments T USING (`tournament_id`)
WHERE
    M.`playerB_score` >= M.`playerA_score` + 3