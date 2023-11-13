### 1. Basic Requirements

* A web server (Apache, nginx, etc)
* A MySQL database (MariaDB also works)
* PHP 7.1 or later with the following extensions: `session`, `exif`, `mbstring`, `gd`, `mysqli`, `json`, `zip`, and optionally, `imagick`

To use Lychee without restrictions, we recommend to increase the values of the following properties in `php.ini`:

```
max_execution_time = 200
post_max_size = 100M
upload_max_filesize = 20M
memory_limit = 256M
```

You might also take a look at the [FAQ](https://github.com/LycheeOrg/Lychee/wiki/FAQ#i-cant-upload-photos).

#### 1.1 Video Thumbnails

Since release 3.2.0, Lychee allows the upload of videos. In order to have thumbnails for the uploaded videos, you will need to do the following:
1. Install `ffmpeg` on your server system
1. [Install PHP dependencies](https://github.com/LycheeOrg/Lychee/wiki/Installation#3-install-php-dependencies) (php-ffmpeg is needed)
1. Adjust the `upload_max_filesize` limit in your `php.ini` according to your needs, e.g. `upload_max_filesize=150m`

Note: As soon as `php-ffmpeg` is available, Lychee tries to create thumbnails for uploaded videos. If `php-ffmpeg`is available but not `ffmpeg`, Lychee will fail to upload a video into the gallery.

#### 1.2 HTTPS

HTTPS is strongly recommended for any public-facing installation. It is possible to obtain a free certificate from services such as [LetsEncrypt](https://letsencrypt.org/).

If you choose not to use HTTPS, you may need to disable or review the `Content-Security-Policy` header in Lychee's .htaccess file.

### 2. Download Lychee

* The easiest way to download Lychee is with `git`:

```
git clone --recurse-submodules https://github.com/LycheeOrg/Lychee.git
```

This will also download this Wiki and the source of [Lychee frontend](https://github.com/LycheeOrg/Lychee-front/).

Make sure to set the correct owner for the files:

```
chown -R www-data:www-data Lychee
```

### 3. Install PHP dependencies

* `cd` into Lychee's folder and run `composer install`
* Alternatively, use the `--working-dir=` command-line argument to specify Lychee's folder
```
cd /var/www/Lychee
composer install
```
```
composer install --working-dir=/var/www/Lychee
```

### 4. Permissions and dependencies

Change the permissions of `uploads/`, `dist/`, `data/` and all their subfolders. Sufficient read/write privileges are required.

```
touch dist/user.css
chmod -R 775 uploads/ dist/
chmod -R 750 data/
```

### 5. Finish

Open Lychee in your browser and follow the given steps.

If you have trouble, take a look at the [FAQ](FAQ).
