WITH SubdivisionHierarchy AS (
    SELECT 
        s.id AS sub_id, 
        s.name AS sub_name,
        0 AS sub_level
    FROM 
        subdivisions s
    JOIN 
        collaborators c ON c.subdivision_id = s.id
    WHERE 
        c.id = 710253

    UNION ALL

    SELECT 
        s.id, 
        s.name,
        sh.sub_level + 1
    FROM 
        subdivisions s
    JOIN 
        SubdivisionHierarchy sh ON s.parent_id = sh.sub_id
    WHERE 
        s.id NOT IN (100055, 100059)
)
SELECT 
    c.id, 
    c.name, 
    sh.sub_name, 
    sh.sub_id, 
    sh.sub_level,
    (SELECT COUNT(*) 
     FROM collaborators cc 
     WHERE cc.subdivision_id = c.subdivision_id) AS colls_count
INTO 
    result_table
FROM 
    SubdivisionHierarchy sh
JOIN 
    collaborators c ON c.subdivision_id = sh.sub_id
WHERE 
    c.age < 40
ORDER BY 
    sh.sub_level ASC;