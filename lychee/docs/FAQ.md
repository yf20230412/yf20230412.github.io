#### Lychee is not working
If Lychee is not working properly, try to open `plugins/Diagnostics/index.php`. This script will display all errors it can find.

If your Lychee installation looks like the image below (credit: [Wh00ps13](https://github.com/Wh00ps13)) check your folder [permissions](https://github.com/LycheeOrg/Lychee/wiki/Installation#4-permissions). If you're not using SSL, check your [.htaccess file](https://github.com/LycheeOrg/Lychee/wiki/Installation#12-https).
![Symbols](https://user-images.githubusercontent.com/48535573/54320044-f31e6f80-45eb-11e9-8901-136620961931.png)

#### What do I need to run Lychee on my server?
To run Lychee, everything you need is a web-server with PHP 5.5 or later and a MySQL-Database.

Lychee uses a `.htaccess` file to configure the server and allow for some advanced options, like uploading from other sources via the API. If you're running an Apache server, you need to enable `.htaccess` write permissions.

You can configure Apache globally in `/etc/apache2/apache2.conf` or per-directory in `etc/apache2/sites-available/your-website.conf`. Find the `<Directory>` directive and change `AllowOverride None` to `AllowOverride All` and save.

```
<Directory /var/www/your-site>
  AllowOverride All
</Directory>
```

#### I can't upload photos
If you experience problems uploading large photos, you might want to change the PHP parameters in `.htaccess` (if you are using the PHP Apache module) or in `.user.ini` (if you are using PHP >= 5.5 with CGI or FastCGI).

> If you modify the `.user.ini` file, you may want to run `git update-index --assume-unchanged .user.ini` afterwards.

If possible, change these settings directly in your `php.ini`. We recommend to increase the values of the following properties:

```
max_execution_time = 200
post_max_size = 100M
upload_max_size = 100M
upload_max_filesize = 20M
memory_limit = 256M
```
#### upstream sent too big header

* This error may be seen from your browser's console if you're trying to debug something with Lychee. If using `nginx`, try adding the following to Lychee's config and reload nginx's service:
```
fastcgi_buffers 16 16k; 
fastcgi_buffer_size 32k;
```

#### Which browsers are supported?

* Lychee supports the latest versions of Google Chrome, Apple's Safari, Mozilla Firefox, Opera, and Microsoft Internet Explorer.
* If you experience any issues with Lychee and wish to report it, make sure to specify the browser you're using and the version of it

#### Which file formats are supported?

* Lychee supports most image formats, and since version 3.2.1 some video formats as well. Specifically, `*.jpg`, `*.jpeg`, `*.png`, `*.gif`, `*.ogv`, `*.mp4`, `*.webm`, and `*.mov` are accepted.
* If you're uploading video files, make sure to increase your upload limits in `php.ini`.  See the [Basic Requirements](https://github.com/LycheeOrg/Lychee/wiki/Installation) section for more information.

#### What is new?
Take a look at the [Changelog](Changelog) to see what's new.

#### Where can I easily contact the LycheeOrg organization ?

There is a gitter associated with the project, feel free to join us there: https://gitter.im/LycheeOrg/Lobby

#### How can I set thumbnails for my albums?
Thumbnails are chosen automatically by the photos you have starred and in the order you uploaded them. Star a photo inside an album to set it as a thumbnail.

#### How can I backup my installation?
To backup your Lychee installation you need to do the following steps:

1. Create a copy of the whole Lychee folder
2. Run the following MySQL Queries:  
```sql
CREATE TABLE lychee_albums_backup LIKE lychee_albums;
INSERT INTO lychee_albums_backup SELECT * FROM lychee_albums;
CREATE TABLE lychee_photos_backup LIKE lychee_photos;
INSERT INTO lychee_photos_backup SELECT * FROM lychee_photos;
CREATE TABLE lychee_settings_backup LIKE lychee_settings;
INSERT INTO lychee_settings_backup SELECT * FROM lychee_settings;
```

#### How can I move my installation?

To move your Lychee installation, you need to do the following steps.

1. Copy `/var/www/html/Lychee` into new host
2. Dump MySQL Lychee database into a file:
```
mysqldump -u user -p Lychee > lychee_backup.sql
```
Replace `user` by your database username.
3. Restore the database on the new host:
```
mysql -u user -p Lychee < lychee_backup.sql
```

#### Can I use my existing folder-structure?
No. Lychee has it's own folder-structure and database. Please upload or import all your photos to use them.

#### Can I upload videos?
Yes, but you will need to change this property for a bigger value:
```
upload_max_filesize = 20M
```

#### Why don't my videos have thumbnails?
You will need ffmpeg installed on your server, and to have installed php-ffmpeg using composer as detailed in the [Installation Guide](https://github.com/LycheeOrg/Lychee/wiki/Installation).

If you are still having problems, check your Lychee log. If you are still getting a `Could not create thumbnail for video because FFMPEG is not available.` error, you may need to specify the location of your ffmpeg and ffprobe binaries. In `php/Modules/Photo.php` replace
```
$ffprobe = FFMpeg\FFProbe::create();
$ffmpeg = FFMpeg\FFMpeg::create();
```
with
```
$ffprobe = FFMpeg\FFProbe::create(array(
        'ffmpeg.binaries'  => '/usr/bin/ffmpeg',
        'ffprobe.binaries' => '/usr/bin/ffprobe',
));
$ffmpeg = FFMpeg\FFMpeg::create(array(
        'ffmpeg.binaries'  => '/usr/bin/ffmpeg',
        'ffprobe.binaries' => '/usr/bin/ffprobe',
));
```
using your correct binary locations. If unsure, you can try running `which ffmpeg` on the server.


#### Is it possible to create multiple users?
[No, not yet.](https://github.com/electerious/Lychee/issues/132) and [here](https://github.com/LycheeOrg/Lychee/issues/30)

#### Does Lychee use ImageMagick?
Yes. Lychee uses ImageMagick when available.

#### Blank screen when viewing a photo using iOS
There's a problem with images compressed by ImageOptim. [Read more.](https://github.com/electerious/Lychee/issues/175#issuecomment-47403992)

#### How to change the title of the site?

* In `index.html`, [change the text inside the `<title>` tag around line 6](https://github.com/LycheeOrg/Lychee/blob/master/index.html#L6) from `Lychee` to your desired site title.
* This may prevent you from doing a `git pull` if there are any upstream changes to `index.html`

#### How to reset username and password?
Simply delete the whole `lychee_settings` table from the database. Lychee will regenerate it and ask you to enter a new username and password.

#### How to hide smart albums?

In [index.html](https://github.com/LycheeOrg/Lychee/blob/master/index.html#L20) add the following lines:

```html
<style>
[data-id="0"] { display:none; }
[data-id="s"] { display:none; }
[data-id="f"] { display:none; }
[data-id="r"] { display:none; }
 </style>
 ```
#### How to disable the 'zoom' animation while browsing pictures?

Add the following custom CSS to your `user.css` or via the settings menu:
```css
#image {
  transition: none !important;
  animation-name: none !important;
  animation-duration: 0 !important;
}
```

#### Lychee-front is not found

* You may see this or a similar message in the Diagnostics logs:
```
/var/www/Lychee/Lychee-front/package.json not found. Please do: git submodule init ; git submodule update
```

* You can attempt to do the suggested commands, but if they should fail, you can manually pull-in Lychee-front:
```
git clone --recurse-submodules 'https://github.com/LycheeOrg/Lychee-front.git' '/var/www/Lychee/Lychee-front'
```

* ...and take note that if you use `git pull` to perform updates on your Lychee folder, you'll have to also do it on the manually pulled-in `Lychee-front` folder:
```
git -C '/var/www/Lychee/Lychee-front' pull origin 'master'
```

#### Composer can't create a cache directory

* When running Composer, you may notice the following warning:
```
Cannot create cache directory /home/$USER/.composer/cache/files/, or directory is not writable. Proceeding without cache
```
* You can specify Composer's cache directory with the environment variable `COMPOSER_CACHE_DIR=`. For Lychee, the cache is not necessary, and you can both disable it and hide the warning by specifying the location of the cache as `/dev/null` ([information](https://github.com/composer/composer/commit/fd6455218e304e9b484bebb0efcdb67bb52d051d)):
```
COMPOSER_CACHE_DIR='/dev/null' composer update --working-dir='/var/www/Lychee'
```

#### I'm importing a lot of photos using "Import from Server" and Lychee times out before it's done
Since 3.2.11 there's an advanced setting `php_script_limit`.  If set to `1` it will remove PHP's execution time limit from the "Import from Server" function. This should be used with caution and reset to `0` once your  import is complete.