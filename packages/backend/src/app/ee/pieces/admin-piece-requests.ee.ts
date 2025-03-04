import { TriggerStrategy } from '@activepieces/pieces-framework'
import { ExactVersionType } from '@activepieces/shared'
import { Type } from '@fastify/type-provider-typebox'

const Action = Type.Object({
    name: Type.String(),
    displayName: Type.String(),
    description: Type.String(),
    requireAuth: Type.Boolean(),
    props: Type.Unknown(),
})

const Trigger = Type.Composite([
    Action,
    Type.Object({
        type: Type.Enum(TriggerStrategy),
    }),
])

export const CreatePieceRequest = {
    schema: {
        body: Type.Object({
            name: Type.String(),
            displayName: Type.String(),
            logoUrl: Type.String(),
            description: Type.Optional(Type.String()),
            version: ExactVersionType,
            auth: Type.Optional(Type.Any()),
            minimumSupportedRelease: ExactVersionType,
            maximumSupportedRelease: ExactVersionType,
            actions: Type.Record(Type.String(), Action),
            triggers: Type.Record(Type.String(), Trigger),
        }),
    },
}
