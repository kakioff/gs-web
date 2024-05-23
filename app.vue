<script setup lang="ts">
import { NModalProvider } from 'naive-ui';
</script>

<template>
  <NModalProvider>
    <NMessageProvider>
      <NuxtLayout>
        <NuxtPage />
      </NuxtLayout>
    </NMessageProvider>
  </NModalProvider>
</template>
