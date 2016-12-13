# APP ADMIN (IOS / ANDROID)
https://itunesconnect.apple.com/
https://play.google.com/apps/publish/



# ==================================
# HOW TO (pre latest a podrobnejsie info kontaktovat psycha)


# 1. Pripravenie appky na DEV instalaciu:
- Na Apple.com: Kupis Apple Developer Account (99$/year)
- Na Apple.com: Stiahnes certifikat cer
- Command line: Vytvoris z cer suboru certifikat p12 (potrebny na buildnutie appky)
- Na Apple.com: Vytvoris novu appku
- Na Apple.com: Pridas zariadenia, ktore budu moct appku instalovat (iPhone’s UDID)
- Na Apple.com: Vytvoris subor urcujuci na ktore zariadenia sa da instalovat (provisioning)
- Na Phonegap.com: Vytvoris novu appku (potrebujes certifikat, provisioning a www.zip)
- Na Phonegap.com: Buildnes ipa subor
- Na Diawi.com: Uploadnes ipa subor
- Posles instalacny link uzivatelovi

# 2. Nasadenie do AppStoru
- boli spravene predosle kroky (mas subor ios.csr a ios.key)
- Na Apple.com: Certificates > Production > App Store and Ad Hoc
- Na Apple.com: Upload CSR - vrati ios_distribution.cer
- Na Apple.com: Provisioning Profiles > Distribution > manually > App Store
- Na Apple.com: Select App ID > Select Certificate > Profile Name “appname-distribution”
- Na Apple.com: Stiahnut appnamedistribution.mobileprovision
- Command line: z (ios_distribution.cer + ios.key + heslo) treba spravit ios_distribution.p12
- Na Phonegap.com: Nahodis p12 a mobileprovisioning subory unlocknes
- Na Phonegap.com: Buildnes ipa subor
- Na iTunesConnect.apple.com: Vytvoris profil pre AppStore appku (upload bude cez Mac)
- (teraz prichadza zabavna cast, bud mas Mac, alebo stiahnes 6GB vmware+macOS https://drive.google.com/file/d/0BxjHmM-XlzKtOEJFYXVPOUg1V00/view, a nainstalujes Xcode 6.3.1 )
- Na Macu: Uploadnutie appky: Xcode > Open Development Tool > Application Loader
- V Application Loader: Deliver Your App > Choose > AppName-distribution.ipa
- Na iTunesConnect.apple.com: My Apps > Activity > All Builds - cakaj spracovanie (~20min)
- Na iTunesConnect.apple.com: My Apps > TestFlight > Internal Testing: pridaj testerov
- > Internal Testing: Select Version to Test > (Encryption: No) > Start Testing (cakam uz 1H)

# 3. Nasadenie do PlayStoru
- Na https://play.google.com/apps/publish/ vytvorit appku
- keytool -v -genkey -v -keystore play.keystore -alias alias -keyalg RSA -validity 10000 (keytool je sucastou javy, staci si ho skopirovat do adresara s klucmi a potom dll ktore mu chyba)
- Na Phonegap.com: pridat key, nazov hocico, alias=alias, zadat heslo, buildnut
- V PlayStore: Upload APK > Alpha Testing > Set up Closed Alpha Testing
- V PlayStore: APK > Alpha Testing > Create List: popridavat maily ludi
- V PlayStore: Why cant I publish app? - povyplnat blbosti (content rating, export info)
- V PlayStore: Publish App (alpha testing) (cakam uz 1H)
