import { Card, Text, Heading, Stack, Box, Code } from '@sanity/ui'

export function Manual() {
  return (
    <Box padding={4} style={{ maxWidth: '800px', margin: '0 auto' }}>
      <Card padding={5} radius={3} shadow={1}>
        <Stack space={5}>
          <Heading as="h1" size={5}>📖 Instrukcja Obsługi CMS</Heading>
          
          <Text size={2}>
            Witaj w panelu zarządzania klubem! Poniżej znajdziesz zbiór najważniejszych informacji o tym, jak działa strona i jak wprowadzać treści.
          </Text>

          <Box>
            <Heading as="h2" size={3} style={{ marginBottom: '16px' }}>1. Dynamiczna Nazwa Klubu [KLUB]</Heading>
            <Text size={2} style={{ lineHeight: '1.6' }}>
              We wszystkich tekstach na stronie (w biografiach zawodników, opisie sztabu, histori klubu oraz w wiadomościach/artykułach) możesz użyć specjalnego tagu <Code size={2}>[KLUB]</Code>. 
              <br /><br />
              Strona <strong>automatycznie podmieni ten tag</strong> na aktualną nazwę klubu ustawioną w zakładce <em>⚙️ Site Settings</em>. 
              Dzięki temu, jeśli kiedykolwiek zmienisz nazwę klubu, wszystkie stare teksty zaktualizują się same!
            </Text>
          </Box>

          <Box>
            <Heading as="h2" size={3} style={{ marginBottom: '16px' }}>2. Hall of Fame vs Pierwsza Drużyna</Heading>
            <Text size={2} style={{ lineHeight: '1.6' }}>
              Każdy zawodnik (zakładka <em>👥 First Team Roster</em>) posiada pole <strong>Is Legend? (Hall of Fame)</strong>. 
              Zaznaczenie tej opcji sprawi, że zawodnik natychmiast zniknie z kadry pierwszej drużyny i zostanie wyeksponowany w elitarnej sekcji <em>⭐ Hall of Fame</em>.
            </Text>
          </Box>

          <Box>
            <Heading as="h2" size={3} style={{ marginBottom: '16px' }}>3. Dynamiczne Herby w Meczach</Heading>
            <Text size={2} style={{ lineHeight: '1.6' }}>
              Podczas tworzenia meczu możesz opcjonalnie wgrać herb przeciwnika. Jeśli tego nie zrobisz, strona automatycznie wygeneruje awaryjną ikonę z krótkim, 3-literowym skrótem nazwy przeciwnika (np. LDN).
              Nasz własny herb jest zawsze pobierany centralnie z <em>⚙️ Site Settings</em>.
            </Text>
          </Box>

          <Box>
            <Heading as="h2" size={3} style={{ marginBottom: '16px' }}>4. Automatyczne Galerie Zdjęć</Heading>
            <Text size={2} style={{ lineHeight: '1.6' }}>
              Pisząc nowy artykuł (Post), możesz dodać zdjęcia do pola <strong>Gallery Images</strong>. Strona sama stworzy z nich piękną galerię z powiększaniem zdjęć (Lightbox), bez konieczności jakiegokolwiek dodatkowego układania na stronie.
            </Text>
          </Box>
        </Stack>
      </Card>
    </Box>
  )
}
