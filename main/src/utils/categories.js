const CATEGORY_LABELS = {
  DEATH_METAL:           'Death Metal',
  NEW_ARRIVALS:          'Recém-chegados',
  DAILY_DEALS:           'Ofertas',
  BLACK_METAL:           'Black Metal',
  POP:                   'Pop',
  BRAZILLIAN_MUSIC:      'Música Brasileira',
  INTERNATIONAL:         'Internacional',
  FOLK:                  'Folk',
  PROG_METAL:            'Metal Progressivo',
  ROCK:                  'Rock',
  ELECTRONIC:            'Eletrônica',
  NU_METAL:              'Nu Metal',
  HARD_ROCK:             'Hard Rock',
  SLUDGE_METAL:          'Sludge Metal',
  HEAVY_METAL:           'Heavy Metal',
  UNDERGROUND:           'Underground',
  CD:                    'CD',
  VINYL:                 'Vinil',
  OFFICIAL_MERCHANDISE:  'Merchandise Oficial',
}

export const formatCategory = (value) => {
  if (!value) return ''
  if (CATEGORY_LABELS[value]) return CATEGORY_LABELS[value]
  return String(value)
    .toLowerCase()
    .split('_')
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ')
}
