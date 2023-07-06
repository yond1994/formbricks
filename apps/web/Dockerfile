FROM node:18-alpine AS installer
RUN corepack enable && corepack prepare pnpm@latest --activate

ARG DATABASE_URL
ARG NEXT_PUBLIC_WEBAPP_URL
ARG NEXT_PUBLIC_EMAIL_VERIFICATION_DISABLED
ARG NEXT_PUBLIC_PASSWORD_RESET_DISABLED
ARG NEXT_PUBLIC_GITHUB_AUTH_ENABLED
ARG NEXT_PUBLIC_GOOGLE_AUTH_ENABLED
ARG NEXT_PUBLIC_PRIVACY_URL
ARG NEXT_PUBLIC_TERMS_URL
ARG NEXT_PUBLIC_IMPRINT_URL

ENV DATABASE_URL=$DATABASE_URL
ENV NEXT_PUBLIC_WEBAPP_URL=$NEXT_PUBLIC_WEBAPP_URL
ENV NEXT_PUBLIC_EMAIL_VERIFICATION_DISABLED=$NEXT_PUBLIC_EMAIL_VERIFICATION_DISABLED
ENV NEXT_PUBLIC_PASSWORD_RESET_DISABLED=$NEXT_PUBLIC_PASSWORD_RESET_DISABLED
ENV NEXT_PUBLIC_GITHUB_AUTH_ENABLED=$NEXT_PUBLIC_GITHUB_AUTH_ENABLED
ENV NEXT_PUBLIC_GOOGLE_AUTH_ENABLED=$NEXT_PUBLIC_GOOGLE_AUTH_ENABLED
ENV NEXT_PUBLIC_PRIVACY_URL=$NEXT_PUBLIC_PRIVACY_URL
ENV NEXT_PUBLIC_TERMS_URL=$NEXT_PUBLIC_TERMS_URL
ARG NEXT_PUBLIC_IMPRINT_URL=$NEXT_PUBLIC_IMPRINT_URL

WORKDIR /app

COPY . .

RUN pnpm install

# Build the project
RUN pnpm prebuild --filter=web...
RUN pnpm turbo run build --filter=web...

FROM node:18-alpine AS runner
RUN corepack enable && corepack prepare pnpm@latest --activate

# Don't run production as root
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs
USER nextjs

WORKDIR /home/nextjs

COPY --from=installer /app/apps/web/next.config.js .
COPY --from=installer /app/apps/web/package.json .

# Automatically leverage output traces to reduce image size
# https://nextjs.org/docs/advanced-features/output-file-tracing
COPY --from=installer --chown=nextjs:nodejs /app/apps/web/.next/standalone ./
COPY --from=installer --chown=nextjs:nodejs /app/apps/web/.next/static ./apps/web/.next/static
COPY --from=installer --chown=nextjs:nodejs /app/apps/web/public ./apps/web/public
COPY --from=installer --chown=nextjs:nodejs /app/packages/database/schema.prisma ./packages/database/schema.prisma
COPY --from=installer --chown=nextjs:nodejs /app/packages/database/migrations ./packages/database/migrations

CMD pnpm dlx prisma migrate deploy && node apps/web/server.js