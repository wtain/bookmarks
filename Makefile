getip:
ifeq "$(shell uname -s)" "Darwin"
	./getip.sh
else
	getip.bat
endif
start: getip
	docker-compose up
start-fresh: getip
	docker-compose up --build
stop:
	docker-compose down
build-server: getip
	docker-compose up --build server
repair:
	repair_winnat.bat
restart: stop start