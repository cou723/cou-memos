$ErrorActionPreference = 'Stop' # stop on all errors
$toolsDir   = "$(Split-Path -parent $MyInvocation.MyCommand.Definition)"
$Version    = "1.2.4"
$url64      = "https://github.com/cou723/cou-memos/releases/download/cou-memos-v"+$Version+"/cou-memos_"+$Version+"_x64_en-US.msi"

$packageArgs = @{
  packageName   = $env:ChocolateyPackageName
  unzipLocation = $toolsDir
  fileType      = 'msi'
  url64bit      = $url64
  checksum64    = ''
  checksumType64= 'sha256'
  silentArgs    = "/quiet" # add this line
}
Install-ChocolateyPackage @packageArgs
