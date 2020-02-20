export function concatAddress(address = {}) {
    const { province, city, district, streetAddress } = address
    return [province, city, district, streetAddress].filter(addr => !!addr).join('')
}
