pkgname=sigmacord-bin
pkgver=1.0.0
pkgrel=1
pkgdesc="Yet another Discord client"
arch=('x86_64')
url="https://aryapraneil.com/sigmacord"
license=('GPL3')
depends=('libayatana-appindicator' 'webkit2gtk' 'gtk3')
provides=('sigmacord')
conflicts=('sigmacord')
source=("https://github.com/enginestein/Sigmacord/releases/download/v${pkgver}/sigmacord_${pkgver}_init.zip")
sha256sums=('e29cb66b447ba6a733e5aded5bb768ab4678f3eeb32c254da79117699ba05967')

package() {
    bsdtar -xf "$srcdir/data.tar.gz" -C "$pkgdir"
}