use std::{
    fs::{self},
    io::Write,
};

#[derive(Serialize, Deserialize, Debug)]
pub struct Config {
    pub data_path: String,
    pub is_show_save_button: bool,
}

use serde::{Deserialize, Serialize};

use crate::{Error, CONFIG_FILE_PATH};

pub fn get_default_config_string() -> String {
    // get_default_configからくるconfigは固定なので、unwrapしても問題ない
    serde_json::to_string(&get_default_config()).unwrap()
}

pub fn get_default_config() -> Config {
    return Config {
        data_path: "../".to_string(),
        is_show_save_button: true,
    };
}

fn to_config(string: String) -> Result<Config, Error> {
    serde_json::from_str(string.as_str()).map_err(|_| Error::ConfigJsonBroken)
}

fn to_string(config: &Config) -> Result<String, Error> {
    serde_json::to_string(&config).map_err(|_| Error::ConfigJsonBroken)
}

fn save(config: &Config) -> Result<(), Error> {
    let mut config_file =
        fs::File::create(CONFIG_FILE_PATH).map_err(|_| Error::ConfigOpenFailed)?;
    let text = to_string(config)?;

    config_file
        .write_all(text.as_bytes())
        .map_err(|_| Error::ConfigWriteFailed)
}

pub fn get() -> Result<Config, Error> {
    let config = match fs::read_to_string(CONFIG_FILE_PATH) {
        Ok(v) => v,
        Err(_) => {
            let default_config = get_default_config();
            println!("get default save");
            save(&default_config).map_err(|e| Error::from(e))?;
            return Ok(default_config);
        }
    };
    Ok(to_config(config)?)
}

pub fn set(key: String, value: String) -> Result<(), Error> {
    let config = fs::read_to_string(CONFIG_FILE_PATH).map_err(|_| Error::ConfigOpenFailed)?;
    let mut config: Config = to_config(config)?;

    match key.as_str() {
        "data_path" => config.data_path = value,
        "is_show_save_button" => {
            config.is_show_save_button =
                value.parse::<bool>().map_err(|_| Error::ConfigInvalidKey)?
        }
        _ => return Err(Error::ConfigInvalidKey),
    };

    println!("set save",);
    save(&config).map_err(|e| Error::from(e))
}

pub fn set_all(config: Config) -> Result<(), Error> {
    eprintln!("save all {:?}", config);
    save(&config).map_err(|e| Error::from(e))
}
