# Implementation notes

## Optimizations

### Faster event lookup

Looking up events could be made faster in the case that the event   
is passed to evee directly, instead of its name.

The following changes would have to be made:

1. Give each `IEventHolder` a unique identifier (holder id?)
2. Mirror that identifier in the `IEvent` interface
3. Use that identifier to bypass the complicated lookup.

An alternative approach would be to store the position in the `IEventHolder`   
within the `IEvent` and use that to make a fast lookup.   
Sadly approach would fail as soon as an `IEvent` is removed from the `IEventHolder`.
