import { readFileSync } from 'fs';
import * as yaml from 'js-yaml'; 
import { join } from 'path';
import _ from 'lodash';

const YAML_COMMON_CONFIG_FILENAME = 'config.yaml';
const YAML_CONFIG_FILENAME = `config.${process.env.NODE_ENV || ''}.yaml`;
const filePath = join(__dirname, '../config', YAML_COMMON_CONFIG_FILENAME);
const envPath = join(__dirname, '../config', YAML_CONFIG_FILENAME);

const commonConfig = yaml.load(readFileSync(filePath, 'utf-8'));
const envConfig = yaml.load(readFileSync(envPath, 'utf-8'));
export default () => {
  return _.merge(commonConfig, envConfig);
};
