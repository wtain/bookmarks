getip:
	getip.bat
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