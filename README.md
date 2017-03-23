# MMM-433MHz

This is a module for [MagicMirror²](https://magicmirror.builders/) to send and receive 433MHz signals via C++ and GPIO.

[433Utils](https://github.com/ninjablocks/433Utils.git) is used for C++ part and wrapped in JavaScript.

## Installation

First we need to install WiringPi:

````
git clone git://git.drogon.net/wiringPi && cd wiringPi &&./build
````

In your terminal, go to your MagicMirror's Module folder:

````
cd ~/MagicMirror/modules
````

Clone this repository:
````
git clone https://github.com/hebestreit/MMM-433MHz.git
````

Go 433Utils/RPi_utils and compile library if you're using a Raspberry Pi:

````
cd ~/MagicMirror/modules/MMM-433MHz/433Utils/RPi_utils
make all
````

## Using the module

To use this module, add it to the modules array in the `config/config.js` file:
````javascript
modules: [
    {
        module: 'MMM-433MHz',
        config: {
            receiver: true
        }
    }
]
````

## Configuration options

The following properties can be configured:

| Option                     | Description
| -------------------------- | -----------
| `receiver`                 | Use this property to enable receiving codes over 433MHz and sending notifications to other modules. Turn this off if you only want to send codes.<br><br> **Possible values:** `boolean` <br> **Default value:** `true`
