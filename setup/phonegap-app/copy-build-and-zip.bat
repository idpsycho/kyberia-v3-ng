rmdir "www/build" /s /q

xcopy "../../build" "www/build" /s /i /q

cd "www/build"
del "main.map"
cd ..
cd ..

del "www.zip"
zip -q -r www.zip www

pause
