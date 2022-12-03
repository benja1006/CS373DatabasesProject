SELECT 
    `real_name`, `birthday`
FROM
    players
WHERE
    NOT `nationality` = 'KR'
    AND `birthday` >= '1985-01-01'
    AND `birthday` < '1986-01-01';