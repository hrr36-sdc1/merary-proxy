Cassandra

 CREATE KEYSPACE shoes
   WITH REPLICATION = {
   'class' : 'SimpleStrategy',
   'replication_factor' : 1
   };

use shoes

 CREATE TABLE SHOES(
   id TEXT,
   name TEXT,
   img_url TEXT,
   short_desc TEXT,
   long_desc TEXT,
   type TEXT,
   price TEXT,
   rating TEXT,
   review_count TEXT,
   details TEXT,
   PRIMARY KEY (id),
 );

 COPY shoes (id, name, img_url, short_desc, long_desc, type, price, rating, review_count, details) FROM '...[direct path taken out]/database/utils/shoeDataTest.csv';

tracing on

SELECT * FROM shoes.shoes WHERE id = '9890999';
SELECT * FROM shoes.shoes WHERE id = '5000000';
SELECT * FROM shoes.shoes WHERE id = '3999999';