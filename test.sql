WITH a AS (
  Select number FROM robotevolution
  WHERE name = 'Auto-Roullete'
  AND created > now() - interval '1 day' 
  ORDER BY created desc
), b as ( 
  SELECT number[0] 
  FROM robotevolution
  WHERE name = 'Auto-Roullete'
  AND created > now() - interval '1 day'	
  ORDER BY created desc
) SELECT * FROM a JOIN b ON a.id = b.id;

