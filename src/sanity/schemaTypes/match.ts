import {defineField, defineType} from 'sanity'

export const matchType = defineType({
  name: 'match',
  title: 'Match',
  type: 'document',
  fields: [
    defineField({
      name: 'opponent',
      title: 'Opponent Name',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'opponentShort',
      title: 'Opponent Short Name (e.g. LDN)',
      type: 'string',
      validation: (rule) => rule.required().max(3),
    }),
    defineField({
      name: 'opponentLogo',
      title: 'Opponent Logo (Optional)',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'competition',
      title: 'Competition (e.g. Premier League)',
      type: 'string',
    }),
    defineField({
      name: 'date',
      title: 'Match Date & Time',
      type: 'datetime',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'isHome',
      title: 'Is Home Match?',
      type: 'boolean',
      initialValue: true,
    }),
    defineField({
      name: 'homeScore',
      title: 'Home Score',
      type: 'number',
    }),
    defineField({
      name: 'awayScore',
      title: 'Away Score',
      type: 'number',
    }),
    defineField({
      name: 'status',
      title: 'Match Status',
      type: 'string',
      options: {
        list: [
          {title: 'Upcoming', value: 'upcoming'},
          {title: 'Live', value: 'live'},
          {title: 'Finished', value: 'finished'},
        ],
      },
      initialValue: 'upcoming',
    }),
    // --- Match Statistics ---
    defineField({
      name: 'possessionHome',
      title: 'Possession Home (%)',
      type: 'number',
      group: 'stats',
    }),
    defineField({
      name: 'possessionAway',
      title: 'Possession Away (%)',
      type: 'number',
      group: 'stats',
    }),
    defineField({
      name: 'shotsHome',
      title: 'Shots Home',
      type: 'number',
      group: 'stats',
    }),
    defineField({
      name: 'shotsAway',
      title: 'Shots Away',
      type: 'number',
      group: 'stats',
    }),
    defineField({
      name: 'shotsOnTargetHome',
      title: 'Shots on Target Home',
      type: 'number',
      group: 'stats',
    }),
    defineField({
      name: 'shotsOnTargetAway',
      title: 'Shots on Target Away',
      type: 'number',
      group: 'stats',
    }),
    defineField({
      name: 'cornersHome',
      title: 'Corners Home',
      type: 'number',
      group: 'stats',
    }),
    defineField({
      name: 'cornersAway',
      title: 'Corners Away',
      type: 'number',
      group: 'stats',
    }),
    defineField({
      name: 'foulsHome',
      title: 'Fouls Home',
      type: 'number',
      group: 'stats',
    }),
    defineField({
      name: 'foulsAway',
      title: 'Fouls Away',
      type: 'number',
      group: 'stats',
    }),
    defineField({
      name: 'yellowCardsHome',
      title: 'Yellow Cards Home',
      type: 'number',
      group: 'stats',
    }),
    defineField({
      name: 'yellowCardsAway',
      title: 'Yellow Cards Away',
      type: 'number',
      group: 'stats',
    }),
    defineField({
      name: 'redCardsHome',
      title: 'Red Cards Home',
      type: 'number',
      group: 'stats',
    }),
    defineField({
      name: 'redCardsAway',
      title: 'Red Cards Away',
      type: 'number',
      group: 'stats',
    }),
    defineField({
      name: 'goalscorers',
      title: 'Goalscorers (e.g. Kowalski 23\', 67\')',
      type: 'text',
      group: 'stats',
    }),
  ],
  groups: [
    { name: 'stats', title: 'Match Statistics' },
  ],
  preview: {
    select: {
      opponent: 'opponent',
      date: 'date',
      homeScore: 'homeScore',
      awayScore: 'awayScore',
      status: 'status',
    },
    prepare({ opponent, date, homeScore, awayScore, status }) {
      const score = status === 'finished' ? `${homeScore ?? '?'} - ${awayScore ?? '?'}` : status;
      return {
        title: `Nova City vs ${opponent}`,
        subtitle: `${new Date(date).toLocaleDateString()} | ${score}`,
      };
    },
  },
})
