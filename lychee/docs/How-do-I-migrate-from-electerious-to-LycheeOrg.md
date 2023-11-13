Before anything make sure to back up your installation (especially the database) before but this should not break that much...

In theory it would just need to change the git remote origin url but we have not integrated the position field yet so we have a small conflict there...

The quick and dirty version is:
```sh
cd ..

# back things up
mv Lychee Lychee.bck 

# reinstall Lychee (notice the recurse!!)
git clone --recurse-submodules https://github.com/LycheeOrg/Lychee.git

# copy the two main folders
cp -r Lychee.bck/uploads/* Lychee/uploads/
cp -r Lychee.bck/data/* Lychee/data/

# if you are using apache, we make sure of the ownership
cd Lychee
chown -R www-data:www-data uploads
chmod -R 775 uploads

# pray the Lord it worked and access the website.
```
