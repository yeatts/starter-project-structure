<script setup lang="ts">
import { useQuery } from '@tanstack/vue-query'
import { createORPCClient } from '@orpc/client'
import { RPCLink } from '@orpc/client/fetch'
import type { AppRouter } from '@server/router'

const orpcClient = createORPCClient<AppRouter>(
  new RPCLink({ url: '/rpc' })
)

const { data, isLoading, isError } = useQuery({
  queryKey: ['reports'],
  queryFn: () => orpcClient.reportBuilder.list(),
})
</script>

<template>
  <section>
    <h2>Reports</h2>
    <p v-if="isLoading">Loading...</p>
    <p v-else-if="isError">Error loading reports.</p>
    <ul v-else>
      <li v-for="report in data" :key="report.id">
        <strong>{{ report.name }}</strong>
        <span v-if="report.description"> — {{ report.description }}</span>
      </li>
    </ul>
  </section>
</template>
