Those type of crash are the hardest to debug.

# I. Add Error reporting to Lychee

You can add the following two lines at the top of `php/index.php` after the `use`  :
```php
ini_set('error_reporting', E_ALL);
ini_set('display_errors', 'On');  //On or Off
```
This should give you this:
```php
<?php

/**
 * @author    Tobias Reich
 * @copyright 2016 by Tobias Reich
 */

namespace Lychee;

use Lychee\Modules\Config;
use Lychee\Modules\Response;
use Lychee\Modules\Settings;
use Lychee\Modules\Validator;

use Lychee\Access\Installation;
use Lychee\Access\Admin;
use Lychee\Access\Guest;

ini_set('error_reporting', E_ALL);
ini_set('display_errors', 'On');  //On or Off
```

Hopefully this will give you some info instead of a white screen in the response panel.

# II. Check the phpinfo

If you can log on to your server, then you can access: https://example.com/php/index.php?fn=phpinfo
If this does not work, you can create a file containing just:
```php
<?php

phpinfo();
exit;
```
Accessing it will allow you to check what is enabled or not.