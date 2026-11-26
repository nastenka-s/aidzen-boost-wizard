CREATE OR REPLACE FUNCTION public.pinterest_daily_limit()
 RETURNS integer
 LANGUAGE sql
 IMMUTABLE
 SET search_path TO 'public'
AS $function$ SELECT 4 $function$;