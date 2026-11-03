'use client';

import createCache from '@emotion/cache';
import { CacheProvider } from '@emotion/react';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider as ThemeRegistry } from '@mui/material/styles';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v14-appRouter'; // or v15/v16 as applicable
import { useServerInsertedHTML } from 'next/navigation';
import { useState, type ReactNode } from 'react';
import { prefixer } from 'stylis';
import rtlPlugin from 'stylis-plugin-rtl';

import { useAppLocale } from '@/i18n/use-locale';
import { createAppTheme } from '@/theme/theme';

interface ThemeRegistryProps {
  children: ReactNode;
}

export default function ThemeProvider({ children }: ThemeRegistryProps) {

  const { isRtl, dir } = useAppLocale();

  const [{ cache, flush }] = useState(() => {
    const cache = createCache({
      key: isRtl ? 'muirtl' : 'muiltr',
      stylisPlugins: isRtl ? [prefixer, rtlPlugin] : [],
    });
    cache.compat = true;
    const prevInsert = cache.insert;
    let inserted: string[] = [];
    cache.insert = (...args) => {
      const serialized = args[1];
      if (inserted.indexOf(serialized.name) === -1) {
        inserted.push(serialized.name);
        prevInsert(...args);
      }
    };
    const flush = () => {
      const prevInserted = inserted;
      inserted = [];
      return prevInserted;
    };
    return { cache, flush };
  });

  useServerInsertedHTML(() => {
    const names = flush();
    if (names.length === 0) return null;
    styles = '';
    for (const name of names) {
      styles += cache.inserted[name];
    }
    return (
      <style
        key={cache.key}
        data-emotion={`${cache.key} ${names.join(' ')}`}
        dangerouslySetInnerHTML={{
          __html: styles,
        }}
      />
    );
  });

  let styles = '';
  const theme = createAppTheme(isRtl);

  return (
    <AppRouterCacheProvider>
      <CacheProvider value={cache}>
        <ThemeRegistry
          theme={theme}
          defaultMode="system"
          modeStorageKey="mui-mode"
        >
          <CssBaseline enableColorScheme />
          {children}
        </ThemeRegistry>
      </CacheProvider>
    </AppRouterCacheProvider>
  );
}