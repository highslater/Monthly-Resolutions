<!-- devLog -->
###Meteor For Everyone Tutorial #1 - Installing Meteor & Creating a Project:  

```Console  
highslater@mint64 ~/Programming/Meteor/LevelUpTuts/Monthly_Resolutions/resolutions_Original $ meteor create resolutions
Created a new Meteor app in 'resolutions'.    

To run your new app:                          
  cd resolutions                              
  meteor                                      
                                              
If you are new to Meteor, try some of the learning resources here:
  https://www.meteor.com/learn                
                                              
highslater@mint64 ~/Programming/Meteor/LevelUpTuts/Monthly_Resolutions/resolutions_Original $ cd resolutions/
highslater@mint64 ~/Programming/Meteor/LevelUpTuts/Monthly_Resolutions/resolutions_Original/resolutions $ ls -hal
total 28K
drwxr-xr-x 5 highslater highslater 4.0K Apr 23 21:50 .
drwxr-xr-x 4 highslater highslater 4.0K Apr 23 21:50 ..
drwxr-xr-x 2 highslater highslater 4.0K Apr 23 21:50 client
-rw-r--r-- 1 highslater highslater   13 Apr 23 21:50 .gitignore
drwxr-xr-x 3 highslater highslater 4.0K Apr 23 21:50 .meteor
-rw-r--r-- 1 highslater highslater  152 Apr 23 21:50 package.json
drwxr-xr-x 2 highslater highslater 4.0K Apr 23 21:50 server
highslater@mint64 ~/Programming/Meteor/LevelUpTuts/Monthly_Resolutions/resolutions_Original/resolutions $ meteor
[[[[[                                         
~/Programming/Meteor/LevelUpTuts/Monthly_Resolutions/resolutions_Original/resolutions
]]]]]

=> Started proxy.                             
=> Started MongoDB.                           
=> Started your app.                          

=> App running at: http://localhost:3000/

```


```Console
highslater@mint64 ~/Programming/Meteor/LevelUpTuts/Monthly_Resolutions $ git add --all
highslater@mint64 ~/Programming/Meteor/LevelUpTuts/Monthly_Resolutions $ git commit -am "commit"
[master b38213a] commit
 2 files changed, 37 insertions(+), 2 deletions(-)
 rewrite resolutions_Original/Development/devLog.md (100%)
highslater@mint64 ~/Programming/Meteor/LevelUpTuts/Monthly_Resolutions $ git push
Counting objects: 15, done.
Delta compression using up to 4 threads.
Compressing objects: 100% (7/7), done.
Writing objects: 100% (8/8), 1.03 KiB | 0 bytes/s, done.
Total 8 (delta 4), reused 0 (delta 0)
To git@github.com:highslater/Monthly-Resolutions.git
   76c7d8e..b38213a  master -> master


```