# Connect your wallet

1. Open the WarrantX application from a trusted URL.
2. Select **Connect wallet** and choose a supported Stellar wallet.
3. Confirm the displayed public key and network. The preview release should show testnet.
4. Approve the WarrantX authentication challenge.

The challenge proves control of the public key for API access. It expires after five minutes and can be consumed only once. Signing the challenge does not transfer assets or authorize a contract call.

Contract actions appear as separate wallet requests. Review the contract ID, function, arguments, network, and simulation before signing.

{% hint style="danger" %}
WarrantX never needs your secret key or recovery phrase. Do not paste either value into the application, API, documentation, or an issue.
{% endhint %}
