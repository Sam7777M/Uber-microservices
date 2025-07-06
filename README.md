# Uber-microservices

Node -v : 21.XXX.XXX


# Unique Features

1) # For Captains
Different captains hits one route => captain/wait-for-new-ride
This route will wait for 30 sec and give the data of new created ride by any user (ride/create-ride) to all captains

2) # For Users
User will hit user/accepted-ride to check if the ride is accepted
This API is long pooled as it will wait for 30 sec and in that 30 sec if any captain accepts the ride by ride/accept-ride?rideId=686adb7593714b7b7dee90d9
then this api will show that ride is accepted

Notes : 
1) PublishToQueue : Tell RabbitMQ
2) Always use JSON.stringify to convert the object to a string before sending it to RabbitMQ
3) Use JSON.parse to convert the string back to an object when receiving it from RabbitMQ
4) Use long pooling by stopping api for sometime and then send the response once available