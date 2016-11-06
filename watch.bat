:start
call ng build -w

rem wait before trying again
call timeout /t 30

goto start
