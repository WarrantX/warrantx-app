# Spending policies

A policy belongs to one spender and one treasury asset. It sets a spending limit for a daily, weekly, or monthly period. It also sets an approval threshold, the number of required approvals, an expiry timestamp, and a monotonically increasing version.

Payment requests retain the policy version under which they were created. A policy update invalidates an unexecuted request made under an older version.

